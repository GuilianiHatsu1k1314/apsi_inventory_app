import React, { useState } from "react";

//Local OrderItem type
interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

//Local Order type
interface Order {
  id: number;
  customer: string;
  items: OrderItem[];
}

export const CSRPage: React.FC = () => {
  const [customer, setCustomer] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleAddItem = () => {
    if (!itemName) return;
    setItems([
      ...items,
      { id: items.length + 1, name: itemName, quantity, price: 100 }, //default price
    ]);
    setItemName("");
    setQuantity(1);
  };

  const handleSubmitOrder = () => {
    if (!customer || items.length === 0) return;

    const newOrder: Order = {
      id: orders.length + 1,
      customer,
      items,
    };

    setOrders([...orders, newOrder]);
    setCustomer("");
    setItems([]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">CSR: Create Order</h1>

      {/* Customer Name */}
      <input
        type="text"
        placeholder="Customer Name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        className="border p-2 mr-2 mb-2"
      />

      {/* Item Input */}
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="border p-2 flex-1"
        />
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

      {/* Item List */}
      {items.length > 0 && (
        <ul className="list-disc pl-5 mb-2">
          {items.map((i) => (
            <li key={i.id}>
              {i.name} x {i.quantity}
            </li>
          ))}
        </ul>
      )}

      {/* Submit Order */}
      <button
        onClick={handleSubmitOrder}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Submit Order
      </button>

      {/* Display Submitted Orders */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Submitted Orders</h2>
      {orders.length === 0 && <p>No orders submitted yet.</p>}
      {orders.map((order) => (
        <div key={order.id} className="border p-3 mb-3 rounded">
          <p><b>Customer:</b> {order.customer}</p>
          <ul className="list-disc pl-5">
            {order.items.map((i) => (
              <li key={i.id}>
                {i.name} x {i.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
