// src/components/customer/StoreOrdersTable.tsx
export const StoreOrdersTable = () => {
  const orders = [
    { id: "014565", name: "Honey Co.", amount: 59, status: "Pending" },
    { id: "054654", name: "Ayala Co.", amount: 43, status: "Pending" },
    { id: "099846", name: "Discaya Co.", amount: 29, status: "Cancelled" },
    { id: "086764", name: "Muelevis Inc.", amount: 21, status: "Completed" },
    { id: "057986", name: "Morales Co.", amount: 14, status: "Completed" },
    { id: "066587", name: "Colarin", amount: 59, status: "Completed" },
  ];

  const statusColors: Record<string, string> = {
    Completed: "bg-green-500",
    Pending: "bg-yellow-400",
    Cancelled: "bg-red-500",
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-3">Store Orders</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Total Amt.</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={i} className="border-b last:border-0">
              <td className="p-2">{o.id}</td>
              <td className="p-2">{o.name}</td>
              <td className="p-2">₱{o.amount}</td>
              <td className="p-2">
                <span
                  className={`text-white px-3 py-1 rounded-full text-sm ${statusColors[o.status]}`}
                >
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
