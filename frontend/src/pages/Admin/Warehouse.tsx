import React, { useState, useEffect } from "react";

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
  status: "Pending" | "Good" | "Spoiled" | "Rejected";
}

export const WarehousePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"inventory" | "received">("inventory");

  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQty, setNewItemQty] = useState(0);
  const [newItemPrice, setNewItemPrice] = useState(0);

  const [receivedGoods, setReceivedGoods] = useState<ReceivedItem[]>([]);

  useEffect(() => {
    // Mock inventory
    setInventory([
      { id: 1, name: "Apple", quantity: 50, price: 100 },
      { id: 2, name: "Orange", quantity: 40, price: 80 },
      { id: 3, name: "Banana", quantity: 30, price: 50 },
    ]);

    // Mock received goods
    setReceivedGoods([
      { id: 1, name: "Apple", quantity: 10, status: "Pending" },
      { id: 2, name: "Orange", quantity: 5, status: "Pending" },
      { id: 3, name: "Banana", quantity: 8, status: "Pending" },
    ]);
  }, []);

  // Inventory editing
  const handleEditInventory = (id: number, field: "quantity" | "price", value: number) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addInventory = () => {
    if (!newItemName || newItemQty <= 0 || newItemPrice <= 0) return;
    const newItem: InventoryItem = {
      id: inventory.length + 1,
      name: newItemName,
      quantity: newItemQty,
      price: newItemPrice,
    };
    setInventory((prev) => [...prev, newItem]);
    setNewItemName("");
    setNewItemQty(0);
    setNewItemPrice(0);
  };

  // Update received goods status
  const updateReceivedStatus = (id: number, status: "Good" | "Spoiled" | "Rejected") => {
    setReceivedGoods((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Warehouse Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "inventory" ? "bg-purple-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("inventory")}
        >
          Inventory Management
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "received" ? "bg-purple-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("received")}
        >
          Received Goods
        </button>
      </div>

      {/* Inventory Tab */}
      {activeTab === "inventory" && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Inventory</h2>
          <table className="w-full text-left border mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Item</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleEditInventory(item.id, "quantity", Number(e.target.value))
                      }
                      className="border p-1 rounded w-20"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        handleEditInventory(item.id, "price", Number(e.target.value))
                      }
                      className="border p-1 rounded w-24"
                    />
                  </td>
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
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Item</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {receivedGoods.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">{item.status}</td>
                  <td className="p-2 flex gap-2">
                    {item.status === "Pending" && (
                      <>
                        <button
                          className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                          onClick={() => updateReceivedStatus(item.id, "Good")}
                        >
                          Good
                        </button>
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                          onClick={() => updateReceivedStatus(item.id, "Spoiled")}
                        >
                          Spoiled
                        </button>
                        <button
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                          onClick={() => updateReceivedStatus(item.id, "Rejected")}
                        >
                          Rejected
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
