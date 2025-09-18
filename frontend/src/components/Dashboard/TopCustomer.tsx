export const TopCustomer = () => {
    const customers = [
    { name: "Mr. Gutierrez", orders: 25 },
    { name: "Mr. Sy", orders: 20 },
    { name: "Mrs. Discaya", orders: 19 },
    { name: "Mrs. Mariveles", orders: 15 },
    { name: "Mrs. Marites", orders: 14 },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-3">Top Customers</h2>
      <ul className="space-y-2">
        {customers.map((c, i) => (
          <li key={i} className="flex justify-between">
            <span>{c.name}</span>
            <span className="font-medium">{c.orders}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}