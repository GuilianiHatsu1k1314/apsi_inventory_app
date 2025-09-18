const suppliers = [
  { id: "014565", name: "Honey Co.", items: "Sky Flakes", amount: 20 },
  { id: "054654", name: "Ayala Co.", items: "Margarine", amount: 40 },
  { id: "099846", name: "Discaya Co.", items: "Fillet of Fish", amount: 50 },
  { id: "086764", name: "Muelves Inc.", items: "Mixed Veggies", amount: 100 },
  { id: "057986", name: "Morales Co.", items: "Ice Cream", amount: 100 },
  { id: "066587", name: "Colarin", items: "Cereal", amount: 100 },
];

export const Distributor = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Suppliers</h2>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Items</th>
              <th className="py-2 px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr
                key={supplier.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-2 px-4">{supplier.id}</td>
                <td className="py-2 px-4">{supplier.name}</td>
                <td className="py-2 px-4">{supplier.items}</td>
                <td className="py-2 px-4">{supplier.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
