import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/SupabaseClient";

// Inventory type
interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

// Received Goods type
interface ReceivedItem {
  id: number;
  name: string;
  quantity: number;
  price: number; // <-- added price
  status: "Pending" | "Good" | "Spoiled" | "Rejected";
}

// OrderItem type
interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  customer: string;
  items: OrderItem[];
  status: string;
}

export const WarehousePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"inventory" | "received" | "orders">("inventory");

  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQty, setNewItemQty] = useState(0);
  const [newItemPrice, setNewItemPrice] = useState(0);

  const [receivedGoods, setReceivedGoods] = useState<ReceivedItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch inventory + received goods + charged orders
  useEffect(() => {
    const fetchData = async () => {
      const { data: inv, error: invErr } = await supabase
        .from("inventory")
        .select("*")
        .order("id");
      if (!invErr && inv) setInventory(inv as InventoryItem[]);

      const { data: rec, error: recErr } = await supabase
        .from("received_goods")
        .select("*")
        .order("id");
      if (!recErr && rec) setReceivedGoods(rec as ReceivedItem[]);

      const { data: ord, error: ordErr } = await supabase
        .from("orders")
        .select("*")
        .eq("status", "Charged")
        .order("id");

      if (!ordErr && ord) {
        const safeOrders = ord.map((o: any) => ({
          ...o,
          items: typeof o.items === "string" ? JSON.parse(o.items) : o.items,
        }));
        setOrders(safeOrders as Order[]);
      }
    };
    fetchData();
  }, []);

  useEffect(()=>{
    document.title = "Warehouse";
  },[]);

  // Add new inventory item manually
  const addInventory = async () => {
    if (!newItemName || newItemQty <= 0 || newItemPrice <= 0) return;
    const { data, error } = await supabase
      .from("inventory")
      .insert([{ name: newItemName, quantity: newItemQty, price: newItemPrice }])
      .select();

    if (error) {
      console.error("Error adding inventory:", error.message);
      return;
    }

    if (data) setInventory((prev) => [...prev, data[0] as InventoryItem]);
    setNewItemName("");
    setNewItemQty(0);
    setNewItemPrice(0);
  };

  // Update received goods status + move into inventory if good
  const updateReceivedStatus = async (
    id: number,
    status: "Good" | "Spoiled" | "Rejected"
  ) => {
    const { data: updated, error } = await supabase
      .from("received_goods")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating received goods:", error.message);
      return;
    }

    if (status === "Good" && updated) {
      const { name, quantity, price } = updated;

      // Check if already in inventory
      const { data: existing } = await supabase
        .from("inventory")
        .select("*")
        .eq("name", name)
        .maybeSingle();

      if (existing) {
        const newQty = existing.quantity + quantity;
        const newPrice = price || existing.price; // preserve price if exists
        await supabase.from("inventory").update({ quantity: newQty, price: newPrice }).eq("id", existing.id);
        setInventory((prev) =>
          prev.map((i) => (i.id === existing.id ? { ...i, quantity: newQty, price: newPrice } : i))
        );
      } else {
        const { data: newInv } = await supabase
          .from("inventory")
          .insert([{ name, quantity, price }])
          .select();

        if (newInv) setInventory((prev) => [...prev, newInv[0] as InventoryItem]);
      }
    }

    // Local state update
    setReceivedGoods((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  // Fulfill order → subtract from inventory
  const fulfillOrder = async (order: Order) => {
    for (const item of order.items) {
      const invItem = inventory.find((inv) => inv.name === item.name);
      if (invItem) {
        const newQty = Math.max(invItem.quantity - item.quantity, 0);
        await supabase.from("inventory").update({ quantity: newQty }).eq("id", invItem.id);
        setInventory((prev) =>
          prev.map((i) => (i.id === invItem.id ? { ...i, quantity: newQty } : i))
        );
      }
    }

    // Mark order fulfilled
    await supabase.from("orders").update({ status: "Fulfilled" }).eq("id", order.id);

    // Remove from local list
    setOrders((prev) => prev.filter((o) => o.id !== order.id));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Warehouse Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded cursor-pointer ${activeTab === "inventory" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("inventory")}
        >
          Inventory Management
        </button>
        <button
          className={`px-4 py-2 rounded cursor-pointer ${activeTab === "received" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("received")}
        >
          Received Goods
        </button>
        <button
          className={`px-4 py-2 rounded cursor-pointer ${activeTab === "orders" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("orders")}
        >
          Fulfill Orders
        </button>
      </div>

      {/* Inventory Tab */}
      {activeTab === "inventory" && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Inventory</h2>
          <table className="w-full text-left border-colapse border-3 border-[var(--dali-purple))]">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 bg-purple-300 border-2 border-[var(--dali-purple))] ...">Item</th>
                <th className="p-2 bg-purple-300 border-2 border-[var(--dali-purple))] ...">Qty</th>
                <th className="p-2 bg-purple-300 border-2 border-[var(--dali-purple))] ...">Price</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2 border-2 border-[var(--dali-purple))] ...">{item.name}</td>
                  <td className="p-2 border-2 border-[var(--dali-purple))] ...">{item.quantity}</td>
                  <td className="p-2 border-2 border-[var(--dali-purple))] ...">₱{item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-lg font-semibold mb-2">Add New Item</h3>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Item Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="border p-2 rounded w-1/3"
            />
            <input
              type="number"
              placeholder="Qty"
              value={newItemQty}
              onChange={(e) => setNewItemQty(Number(e.target.value))}
              className="border p-2 rounded w-1/3"
            />
            <input
              type="number"
              placeholder="Price"
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(Number(e.target.value))}
              className="border p-2 rounded w-1/3"
            />
          </div>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
            onClick={addInventory}
          >
            Add Item
          </button>
        </div>
      )}

      {/* Received Goods Tab */}
      {activeTab === "received" && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Received Goods</h2>
          {receivedGoods.length === 0 && <p>No received items.</p>}
          <table className="w-full text-left border-colapse border-3 border-[var(--dali-purple))]">
            <thead>
              <tr>
                <th className="p-2 bg-purple-300 border-2 border-[var(--dali-purple))] ...">Item</th>
                <th className="p-2 bg-purple-300 border-2 border-[var(--dali-purple))] ...">Qty</th>
                <th className="p-2 bg-purple-300 border-2 border-[var(--dali-purple))] ...">Price</th>
                <th className="p-2 bg-purple-300 border-2 border-[var(--dali-purple))] ...">Status</th>
                <th className="p-2 bg-purple-300 border-2 border-[var(--dali-purple))] ...">Action</th>
              </tr>
            </thead>
            <tbody>
              {receivedGoods.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2 border-2 border-[var(--dali-purple))] ...">{item.name}</td>
                  <td className="p-2 border-2 border-[var(--dali-purple))] ...">{item.quantity}</td>
                  <td className="p-2 border-2 border-[var(--dali-purple))] ...">₱{item.price.toFixed(2)}</td>
                  <td className="p-2 border-2 border-[var(--dali-purple))] ...">{item.status}</td>
                  <td className="p-2 border-2 border-[var(--dali-purple))] ...">
                    {item.status === "Pending" && (
                      <div className="flex justify-evenly">
                        <button
                          className="bg-green-600 text-white px-5 py-1 rounded hover:bg-green-700 cursor-pointer"
                          onClick={() => updateReceivedStatus(item.id, "Good")}
                        >
                          Good
                        </button>
                        <button
                          className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 cursor-pointer"
                          onClick={() => updateReceivedStatus(item.id, "Spoiled")}
                        >
                          Spoiled
                        </button>
                        <button
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 cursor-pointer"
                          onClick={() => updateReceivedStatus(item.id, "Rejected")}
                        >
                          Rejected
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Fulfill Orders Tab */}
      {activeTab === "orders" && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Orders to Fulfill</h2>
          {orders.length === 0 && <p>No charged orders to fulfill.</p>}
          {orders.map((order) => (
            <div key={order.id} className="border-3 border-[var(--dali-purple)] p-5 mb-3 rounded-[16px] p-3 mb-3 rounded">
              <p>
                <b className="text-purple-900">Customer:</b> {order.customer}
              </p>
              <ul className="list-disc pl-5">
                {order.items.map((i) => (
                  <li key={i.id}>
                    {i.name} x {i.quantity}
                  </li>
                ))}
              </ul>
              <button
                className="mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 cursor-pointer"
                onClick={() => fulfillOrder(order)}
              >
                Fulfill Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
