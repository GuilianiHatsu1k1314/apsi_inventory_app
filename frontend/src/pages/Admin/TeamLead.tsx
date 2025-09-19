import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/SupabaseClient";

//Local types
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
  const [loading, setLoading] = useState(true);

  //This fetches the orders from Supabase
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching orders:", error.message);
      } else {
        //Ensure items are always an array
        const safeOrders = (data || []).map((o: any) => ({
          ...o,
          items:
            typeof o.items === "string"
              ? JSON.parse(o.items) //if saved as string
              : Array.isArray(o.items)
              ? o.items
              : [], //fallback
        }));
        setOrders(safeOrders as Order[]);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  useEffect(()=>{
    document.title = "Team Leader";
  },[]);
  //Approve / reject the order - Team Leader
  const updateOrderStatus = async (orderId: number, status: Order["status"]) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) {
      console.error("Error updating order status:", error.message);
      return;
    }

    //This updates the local state
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const pendingOrders = orders.filter((o) => o.status === "Pending Approval");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Team Leader: Approve Orders</h1>

      {loading && <p>Loading orders...</p>}
      {!loading && pendingOrders.length === 0 && <p>No pending orders.</p>}

      {pendingOrders.map((order) => (
        <div key={order.id} className="border p-3 mb-3 rounded">
          <p>
            <b>Customer:</b> {order.customer}
          </p>
          <ul className="list-disc pl-5">
            {order.items.map((item) => (
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
