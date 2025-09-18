// src/components/customer/RetailersTable.tsx
export const RetailersTable = () => {
  const retailers = [
    { id: "014565", name: "Honey Co.", contact: "09...", address: "21st..." },
    { id: "054654", name: "Ayala Co.", contact: "09...", address: "Mula..." },
    { id: "099846", name: "Discaya Co.", contact: "09...", address: "678..." },
    { id: "086764", name: "Muelevis Inc.", contact: "09...", address: "321..." },
    { id: "057986", name: "Morales Co.", contact: "09...", address: "088..." },
    { id: "066587", name: "Colarin", contact: "09...", address: "Holy..." },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-3">Retailers/Stores</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {retailers.map((r, i) => (
            <tr key={i} className="border-b last:border-0">
              <td className="p-2">{r.id}</td>
              <td className="p-2">{r.name}</td>
              <td className="p-2">{r.contact}</td>
              <td className="p-2">{r.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
