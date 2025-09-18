import React, { useState, useEffect } from "react";

// Mock types
interface Order {
  id: number;
  customer: string;
  status: "Pending" | "Approved" | "Rejected";
  total: number;
}

interface Invoice {
  customer: string;
  total: number;
  paymentMethod: string;
  date: string;
}

interface InventoryChange {
  item: string;
  quantity: number;
  action: "Added" | "Edited" | "Received" | "Rejected";
  date: string;
}

export const ReportsPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [inventoryChanges, setInventoryChanges] = useState<InventoryChange[]>([]);

  useEffect(() => {
    // Fetch from backend in a real app
    setOrders([
      { id: 1, customer: "Juan Dela Cruz", status: "Approved", total: 250 },
      { id: 2, customer: "Maria Santos", status: "Rejected", total: 100 },
    ]);
    setInvoices([
      { customer: "Juan Dela Cruz", total: 250, paymentMethod: "Cash", date: "2025-09-19" },
    ]);
    setInventoryChanges([
      { item: "Apple", quantity: 50, action: "Added", date: "2025-09-19" },
      { item: "Orange", quantity: 10, action: "Received", date: "2025-09-19" },
    ]);
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reports Dashboard</h1>

      {/* Overview */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-purple-100 rounded-lg">
          <p className="font-bold">Total Orders</p>
          <p>{orders.length}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg">
          <p className="font-bold">Approved Orders</p>
          <p>{orders.filter(o => o.status === "Approved").length}</p>
        </div>
        <div className="p-4 bg-red-100 rounded-lg">
          <p className="font-bold">Rejected Orders</p>
          <p>{orders.filter(o => o.status === "Rejected").length}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg">
          <p className="font-bold">Invoices Issued</p>
          <p>{invoices.length}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">CSR Orders</h2>
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Customer</th>
              <th className="p-2">Status</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-t">
                <td className="p-2">{order.customer}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2">₱{order.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoices Table */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Accounting Charges</h2>
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Customer</th>
              <th className="p-2">Total</th>
              <th className="p-2">Payment Method</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{inv.customer}</td>
                <td className="p-2">₱{inv.total.toFixed(2)}</td>
                <td className="p-2">{inv.paymentMethod}</td>
                <td className="p-2">{inv.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inventory Changes */}
      <div>
        <h2 className="text-xl font-bold mb-2">Warehouse Inventory Changes</h2>
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Item</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Action</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {inventoryChanges.map((change, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{change.item}</td>
                <td className="p-2">{change.quantity}</td>
                <td className="p-2">{change.action}</td>
                <td className="p-2">{change.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
