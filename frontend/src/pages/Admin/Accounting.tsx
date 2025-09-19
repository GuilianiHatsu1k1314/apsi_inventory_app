import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/SupabaseClient";

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

interface Invoice {
  orderId: number;
  customer: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  date: string;
}

export const AccountingPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  //Fetch approved orders
  useEffect(() => {
    const fetchOrders = async () => {
      const { data: ordersData, error } = await supabase
        .from("orders")
        .select("*")
        .eq("status", "Approved");

      if (error) {
        console.error("Error fetching orders:", error.message);
        return;
      }

      if (!ordersData) return;

      //parse items in JSON
      const parsedOrders: Order[] = ordersData.map((o: any) => ({
        ...o,
        items:
          typeof o.items === "string"
            ? JSON.parse(o.items)
            : Array.isArray(o.items)
            ? o.items
            : [],
      }));

      setOrders(parsedOrders);
    };

    fetchOrders();
  }, []);

  useEffect(()=>{
    document.title = "Accounting";
  },[]);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || null;

  //Auto-select first order, for easy flow
  useEffect(() => {
    if (orders.length > 0) {
      setSelectedOrderId(orders[0].id);
    }
  }, [orders]);

  const total = selectedOrder
    ? selectedOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  const handleCharge = async () => {
    if (!selectedOrder) return;

    //Insert payment record
    const { error: payError } = await supabase.from("payments").insert([
      {
        order_id: selectedOrder.id,
        amount: total,
        payment_method: paymentMethod,
      },
    ]);

    if (payError) {
      console.error("Error inserting payment:", payError.message);
      return;
    }

    //Updates order status
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status: "Charged" })
      .eq("id", selectedOrder.id);

    if (updateError) {
      console.error("Error updating order:", updateError.message);
      return;
    }

    const newInvoice: Invoice = {
      orderId: selectedOrder.id,
      customer: selectedOrder.customer,
      items: selectedOrder.items,
      total,
      paymentMethod,
      date: new Date().toLocaleString(),
    };

    setInvoice(newInvoice);

    //Remove order from the list
    setOrders((prev) => prev.filter((o) => o.id !== selectedOrder.id));
    setSelectedOrderId(null);
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Accounting Dashboard</h1>

      <div className="w-xl bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Charge Approved Orders</h2>

        {orders.length === 0 ? (
          <p>No approved orders to charge.</p>
        ) : (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Select Order</label>
              <select
                value={selectedOrderId ?? ""}
                onChange={(e) => setSelectedOrderId(Number(e.target.value))}
                className="border-2 border-[var(--dali-purple)] rounded-lg p-2 w-full"
              >
                {orders.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.customer} (Order #{o.id})
                  </option>
                ))}
              </select>
            </div>

            {selectedOrder && (
              <table className="w-full text-left border-colapse border-3 border-[var(--dali-purple))]">
                <thead>
                  <tr>
                    <th className="p-2 bg-purple-300 border-2 border-[var(--dali-purple))] ...">Item</th>
                    <th className="p-2 bg-purple-300 border-2 border-[var(--dali-purple))] ...">Qty</th>
                    <th className="p-2 bg-purple-300 border-2 border-[var(--dali-purple))] ...">Price</th>
                    <th className="p-2 bg-purple-300 border-2 border-[var(--dali-purple))] ...">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-2 border-2 border-[var(--dali-purple))] ...">{item.name}</td>
                      <td className="p-2 border-2 border-[var(--dali-purple))] ...">{item.quantity}</td>
                      <td className="p-2 border-2 border-[var(--dali-purple))] ...">₱{item.price.toFixed(2)}</td>
                      <td className="p-2 border-2 border-[var(--dali-purple))] ...">
                        ₱{(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="text-lg font-bold">₱{total.toFixed(2)}</span>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="border-2 border-[var(--dali-purple)] rounded-lg p-2 w-full"
              >
                <option>Cash</option>
                <option>Credit Card</option>
                <option>Bank Transfer</option>
                <option>On Account</option>
              </select>
            </div>

            <button
              onClick={handleCharge}
              className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 cursor-pointer"
            >
              Charge Customer
            </button>
          </>
        )}
      </div>

      {invoice && (
        <div className="mt-8 p-6 bg-green-100 rounded-lg w-full max-w-xl">
          <h3 className="font-bold mb-2">Invoice Created</h3>
          <p>
            Customer <b>{invoice.customer}</b> was charged{" "}
            <b>₱{invoice.total.toFixed(2)}</b> via <b>{invoice.paymentMethod}</b>.
          </p>
          <p className="text-sm text-gray-500">Date: {invoice.date}</p>
        </div>
      )}
    </div>
  );
};
