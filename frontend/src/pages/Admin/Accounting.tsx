import React, { useState, useEffect } from "react";

// Types
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

  // Simulate fetching orders from DB
  useEffect(() => {
    const fetchOrders = async () => {
      const data: Order[] = [
        {
          id: 1,
          customer: "Juan Dela Cruz",
          items: [
            { id: 1, name: "Apple", quantity: 2, price: 100 },
            { id: 2, name: "Orange", quantity: 3, price: 80 },
          ],
          status: "Approved",
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

  const approvedOrders = orders.filter((o) => o.status === "Approved");
  const selectedOrder = approvedOrders.find((o) => o.id === selectedOrderId) || null;

  useEffect(() => {
    if (approvedOrders.length > 0) {
      setSelectedOrderId(approvedOrders[0].id);
    } else {
      setSelectedOrderId(null);
    }
  }, [orders]);

  const total = selectedOrder
    ? selectedOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  const handleCharge = () => {
    if (!selectedOrder) return;

    const newInvoice: Invoice = {
      orderId: selectedOrder.id,
      customer: selectedOrder.customer,
      items: selectedOrder.items,
      total,
      paymentMethod,
      date: new Date().toLocaleString(),
    };

    setInvoice(newInvoice);

    // Update order status in "DB"
    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: "Charged" } : order
      )
    );
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Accounting Dashboard</h1>

      <div className="max-w-xl bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Charge Approved Orders</h2>

        {approvedOrders.length === 0 ? (
          <p>No approved orders to charge.</p>
        ) : (
          <>
            {/* Order Selector */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Select Order</label>
              <select
                value={selectedOrderId ?? ""}
                onChange={(e) => setSelectedOrderId(Number(e.target.value))}
                className="border rounded-lg p-2 w-full"
              >
                {approvedOrders.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.customer} (Order #{o.id})
                  </option>
                ))}
              </select>
            </div>

            {/* Items Table */}
            {selectedOrder && (
              <table className="w-full text-left border mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">Item</th>
                    <th className="p-2">Qty</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-2">{item.name}</td>
                                <td className="p-2">{item.quantity}</td>

                      <td className="p-2">₱{item.price.toFixed(2)}</td>
                      <td className="p-2">₱{(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="text-lg font-bold">₱{total.toFixed(2)}</span>
            </div>

            {/* Payment Method */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="border rounded-lg p-2 w-full"
              >
                <option>Cash</option>
                <option>Credit Card</option>
                <option>Bank Transfer</option>
                <option>On Account</option>
              </select>
            </div>

            {/* Charge Button */}
            <button
              onClick={handleCharge}
              className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700"
            >
              Charge Customer
            </button>
          </>
        )}
      </div>

      {/* Show Invoice */}
      {invoice && (
        <div className="mt-8 p-6 bg-green-100 rounded-lg w-full max-w-xl">
          <h3 className="font-bold mb-2">Invoice Created ✅</h3>
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
