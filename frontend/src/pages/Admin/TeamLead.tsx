import React, { useState, useEffect } from "react";

// Local types
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

export const TeamLeaderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Simulate fetching orders from DB / API
  useEffect(() => {
    const fetchOrders = async () => {
      // Replace this with your actual API call
      const data: Order[] = [
        {
          id: 1,
          customer: "Juan Dela Cruz",
          items: [
            { id: 1, name: "Apple", quantity: 2, price: 100 },
            { id: 2, name: "Orange", quantity: 3, price: 80 },
          ],
          status: "Pending Approval",
        },
        {
          id: 2,
          customer: "Maria Clara",
          items: [{ id: 1, name: "Banana", quantity: 5, price: 50 }],
          status: "Pending Approval",
        },
      ];
      setOrders(data);
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = (orderId: number, status: Order["status"]) => {
    // In real app, send PATCH/PUT to backend to update DB
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const pendingOrders = orders.filter(o => o.status === "Pending Approval");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Team Leader: Approve Orders</h1>

      {pendingOrders.length === 0 && <p>No pending orders.</p>}

      {pendingOrders.map(order => (
        <div key={order.id} className="border p-3 mb-3 rounded">
          <p><b>Customer:</b> {order.customer}</p>
          <ul className="list-disc pl-5">
            {order.items.map(item => (
              <li key={item.id}>
                {item.name} x {item.quantity} (₱{item.price})
              </li>
            ))}
          </ul>
          <div className="mt-2 flex gap-2">
            <button
              className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer"
              onClick={() => updateOrderStatus(order.id, "Approved")}
            >
              Approve
            </button>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
              onClick={() => updateOrderStatus(order.id, "Rejected")}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
