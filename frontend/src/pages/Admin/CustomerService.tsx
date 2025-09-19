import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/SupabaseClient";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

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
  status: "Pending Approval" | "Approved" | "Rejected" | "Charged" | "Fulfilled";
}

export const CSRPage: React.FC = () => {
  const [customer, setCustomer] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  //Inventory dropdown of items
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | "">("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState<OrderItem[]>([]);

  //Fetch orders + inventory
  useEffect(() => {
    const fetchData = async () => {
      const { data: ordersData } = await supabase.from("orders").select("*").order("id");
      if (ordersData) {
        const safeOrders = ordersData.map((o: any) => ({
          ...o,
          items:
            typeof o.items === "string"
              ? JSON.parse(o.items)
              : Array.isArray(o.items)
              ? o.items
              : [],
        }));
        setOrders(safeOrders as Order[]);
      }

      const { data: inv } = await supabase.from("inventory").select("*").order("id");
      if (inv) setInventory(inv as InventoryItem[]);
    };
    fetchData();
  }, []);

  //Adds item from dropdown
  const handleAddItem = () => {
    if (selectedItemId === "" || quantity <= 0) return;

    const item = inventory.find((inv) => inv.id === selectedItemId);
    if (!item) return;

    const newItem: OrderItem = {
      id: items.length + 1,
      name: item.name,
      quantity,
      price: item.price,
    };

    setItems([...items, newItem]);
    setSelectedItemId(""); //reset back to empty string instead of null
    setQuantity(1);
  };

  //Submit order
  const handleSubmitOrder = async () => {
    if (!customer || items.length === 0) return;

    //Checks stock availability
    for (const i of items) {
      const stock = inventory.find((inv) => inv.name === i.name);
      if (!stock || i.quantity > stock.quantity) {
        const rejectedOrder = {
          customer,
          items: JSON.stringify(items),
          status: "Rejected",
        };
        await supabase.from("orders").insert([rejectedOrder]);
        alert(`Order rejected: Not enough stock for ${i.name}`);
        setCustomer("");
        setItems([]);
        return;
      }
    }

    const newOrder = {
      customer,
      items: JSON.stringify(items),
      status: "Pending Approval",
    };

    const { data, error } = await supabase.from("orders").insert([newOrder]).select();

    if (error) {
      console.error("Error submitting order:", error.message);
      return;
    }

    if (data) {
      const inserted = data.map((o: any) => ({
        ...o,
        items:
          typeof o.items === "string"
            ? JSON.parse(o.items)
            : Array.isArray(o.items)
            ? o.items
            : [],
      }));
      setOrders([...orders, inserted[0] as Order]);
    }

    setCustomer("");
    setItems([]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">CSR: Create Order</h1>

      {/*Customer Name Input*/}
      <input
        type="text"
        placeholder="Customer Name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        className="border p-2 mr-2 mb-2"
      />

      {/*Item Dropdown*/}
      <div className="flex gap-2 mb-2">
        <select
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value ? Number(e.target.value) : "")}
          className="border p-2 flex-1"
        >
          <option value="">Select Item</option>
          {inventory.map((inv) => (
            <option key={inv.id} value={inv.id}>
              {inv.name} (₱{inv.price}) | Stock: {inv.quantity}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-2 w-24"
        />
        <button
          onClick={handleAddItem}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Add Item
        </button>
      </div>

      {/*Item List*/}
      {items.length > 0 && (
        <ul className="list-disc pl-5 mb-2">
          {items.map((i) => (
            <li key={i.id}>
              {i.name} x {i.quantity} (₱{i.price} each)
            </li>
          ))}
        </ul>
      )}

      {/*Submit Order*/}
      <button
        onClick={handleSubmitOrder}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Submit Order
      </button>

      {/*Display Submitted Orders*/}
      <h2 className="text-xl font-semibold mt-6 mb-2">Submitted Orders</h2>
      {orders.length === 0 && <p>No orders submitted yet.</p>}
      {orders.map((order) => (
        <div key={order.id} className="border p-3 mb-3 rounded">
          <p>
            <b>Customer:</b> {order.customer}
          </p>
          <p>
            <b>Status:</b> {order.status}
          </p>
          <ul className="list-disc pl-5">
            {order.items.map((i) => (
              <li key={i.id}>
                {i.name} x {i.quantity} (₱{i.price})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
