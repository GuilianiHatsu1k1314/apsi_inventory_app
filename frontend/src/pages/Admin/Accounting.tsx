import React, { useState } from "react";

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Customer {
  id: number;
  name: string;
  email: string;
}

export const AccountingPage: React.FC = () => {
  // Example customers
  const customers: Customer[] = [
    { id: 1, name: "Juan Dela Cruz", email: "juan@email.com" },
    { id: 2, name: "Maria Santos", email: "maria@email.com" },
    { id: 3, name: "Pedro Reyes", email: "pedro@email.com" },
  ];

  // State for selected customer
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0].id);

  // Sample items (in real app, fetch based on customer order)
  const [items] = useState<Item[]>([
    { id: 1, name: "Lucky me Pancit Canton", price: 25, quantity: 1 },
    { id: 2, name: "Knorr cubes", price: 50, quantity: 2 },
  ]);

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [invoice, setInvoice] = useState<any | null>(null);

  const customer = customers.find((c) => c.id === selectedCustomerId)!;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCharge = () => {
    const newInvoice = {
      customerId: customer.id,
      items,
      total,
      paymentMethod,
      date: new Date().toLocaleString(),
    };

    setInvoice(newInvoice);
    console.log("Invoice submitted:", newInvoice);
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Accounting Dashboard</h1>

      <div className="max-w-xl bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Charge Customer</h2>

        {/* Customer Selector */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Select Customer</label>
          <select
            value={selectedCustomerId}
            onChange={(e) => setSelectedCustomerId(Number(e.target.value))}
            className="border rounded-lg p-2 w-full"
          >
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.email})
              </option>
            ))}
          </select>
        </div>

        {/* Items Table */}
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
            {items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">₱{item.price.toFixed(2)}</td>
                <td className="p-2">
                  ₱{(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
      </div>

      {/* Show Invoice */}
      {invoice && (
        <div className="mt-8 p-6 bg-green-100 rounded-lg">
          <h3 className="font-bold mb-2">Invoice Created ✅</h3>
          <p>
            Customer <b>{customer.name}</b> was charged{" "}
            <b>₱{invoice.total.toFixed(2)}</b> via{" "}
            <b>{invoice.paymentMethod}</b>.
          </p>
          <p className="text-sm text-gray-500">Date: {invoice.date}</p>
        </div>
      )}
    </div>
  );
};
