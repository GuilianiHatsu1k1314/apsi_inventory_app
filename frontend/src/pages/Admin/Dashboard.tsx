import { useEffect, useState } from "react";
import { supabase } from "../../lib/SupabaseClient";

export const Dashboard = () => {
  return (
    <main className="p-6 w-full">
      <div className="grid grid-cols-3 gap-6">
        {/*Left column*/}
        <div className="col-span-1 space-y-6">
          <TopCustomer />
        </div>

        {/*Right column*/}
        <div className="col-span-2 space-y-6">
          <Stock />

          <div className="grid grid-cols-2 gap-6">
            <MostOrderedItems />
            <LeastOrderedItems />
          </div>
        </div>
      </div>
    </main>
  );
};

//Shows the top customer, limited to 5 customers only
type PaymentRow = {
  amount: number;
  orders: { customer: string } | null;
};

const TopCustomer = () => {
  const [customers, setCustomers] = useState<{ name: string; total: number }[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("amount, orders(customer)")
        .returns<PaymentRow[]>();

      if (error) {
        console.error(error);
        return;
      }

      const totals: Record<string, number> = {};
      data.forEach((row: PaymentRow) => {
        const name = row.orders?.customer ?? "Unknown";
        totals[name] = (totals[name] || 0) + (row.amount ?? 0);
      });

      const sorted = Object.entries(totals)
        .map(([name, total]) => ({ name, total }))
        .sort((a, b) => b.total - a.total)
        //set to 5
        .slice(0, 5);

      setCustomers(sorted);
    };

    fetchCustomers();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-lg font-bold mb-2">Top Customers</h2>
      {customers.length > 0 ? (
        <ul className="divide-y">
          {customers.map((cust, i) => (
            <li
              key={i}
              className={`flex justify-between py-2 ${
                i === 0 ? "font-bold text-blue-600" : ""
              }`}
            >
              <span>{cust.name}</span>
              <span>₱{cust.total.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

//Stocks
type InventoryRow = {
  name: string;
  quantity: number;
  price: number;
};

const Stock = () => {
  const [stock, setStock] = useState<InventoryRow[]>([]);

  useEffect(() => {
    const fetchStock = async () => {
      const { data, error } = await supabase
        .from("inventory")
        .select("name, quantity, price")
        .returns<InventoryRow[]>();

      if (error) {
        console.error(error);
      } else {
        setStock(data);
      }
    };
    fetchStock();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-lg font-bold mb-2">Current Stock</h2>
      <ul className="divide-y">
        {stock.map((item: InventoryRow, i: number) => (
          <li key={i} className="flex justify-between py-2">
            <span>{item.name}</span>
            <span>
              {item.quantity} pcs (₱{item.price})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

//Aggregate the orders
type OrderRow = {
  items: string | { name: string; quantity: number }[];
};

const useAggregatedOrders = () => {
  const [totals, setTotals] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from("orders").select("items");

      if (error) {
        console.error(error);
        return;
      }

      const agg: Record<string, number> = {};
      (data as OrderRow[]).forEach((row) => {
        const parsedItems =
          typeof row.items === "string" ? JSON.parse(row.items) : row.items;

        parsedItems.forEach((item:any) => {
          agg[item.name] = (agg[item.name] || 0) + (item.quantity ?? 0);
        });
      });

      setTotals(agg);
    };

    fetchOrders();
  }, []);

  return totals;
};

//Most ordered items fetch
const MostOrderedItems = () => {
  const totals = useAggregatedOrders();

  const items = Object.entries(totals)
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-lg font-bold mb-2">Most Ordered Items</h2>
      <ul className="divide-y">
        {items.map((row, i) => (
          <li key={i} className="flex justify-between py-2">
            <span>{row.name}</span>
            <span>{row.total} pcs</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

//Least ordered items fetch
const LeastOrderedItems = () => {
  const totals = useAggregatedOrders();

  const items = Object.entries(totals)
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => a.total - b.total)
    .slice(0, 5);

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-lg font-bold mb-2">Least Ordered Items</h2>
      <ul className="divide-y">
        {items.map((row, i) => (
          <li key={i} className="flex justify-between py-2">
            <span>{row.name}</span>
            <span>{row.total} pcs</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
