import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/SupabaseClient";

interface Order {
  id: number;
  customer: string;
  status: string;
  created_at: string;
}

interface Invoice {
  customer: string;
  total: number;
  payment_method: string;
  created_at: string;
}

interface InventoryChange {
  id: number;
  name: string;
  quantity: number;
  price: number;
  created_at: string;
}

export const ReportsPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [inventoryChanges, setInventoryChanges] = useState<InventoryChange[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //Orders table
    const { data: ordersData, error: ordersError } = await supabase
      .from("orders")
      .select("id, customer, status, created_at");
    if (!ordersError && ordersData) setOrders(ordersData);

    //Payment
    const { data: paymentsData, error: paymentsError } = await supabase
      .from("payments")
      .select("amount, payment_method, created_at, orders(customer)");
    if (!paymentsError && paymentsData) {
      setInvoices(
        paymentsData.map((p: any) => ({
          customer: p.orders?.customer ?? "Unknown",
          total: p.amount,
          payment_method: p.payment_method,
          created_at: p.created_at,
        }))
      );
    }

    //Inventory changes
    const { data: inventoryData, error: invError } = await supabase
      .from("inventory")
      .select("id, name, quantity, price, created_at");
    if (!invError && inventoryData) setInventoryChanges(inventoryData);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reports Dashboard</h1>

      {/*Overview*/}
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

      {/*Orders Table*/}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">CSR Orders</h2>
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Customer</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-t">
                <td className="p-2">{order.customer}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2">{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*Invoices Table*/}
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
                <td className="p-2">{inv.payment_method}</td>
                <td className="p-2">{new Date(inv.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*Inventory Changes*/}
      <div>
        <h2 className="text-xl font-bold mb-2">Warehouse Inventory Changes</h2>
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Item</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Price</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {inventoryChanges.map(change => (
              <tr key={change.id} className="border-t">
                <td className="p-2">{change.name}</td>
                <td className="p-2">{change.quantity}</td>
                <td className="p-2">₱{change.price.toFixed(2)}</td>
                <td className="p-2">{new Date(change.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
