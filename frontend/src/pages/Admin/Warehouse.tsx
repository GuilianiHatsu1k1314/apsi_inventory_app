const receivedItems = [
  { item: "Sky Flakes", condition: "Spoiled", status: "Outgoing" },
  { item: "Margarine", condition: "Rejected", status: "Incoming" },
  { item: "Fillet of Fish", condition: "Passed", status: "Outgoing" },
  { item: "Mixed Veggies", condition: "Damaged", status: "Outgoing" },
  { item: "Ice Cream", condition: "Missing", status: "Incoming" },
  { item: "Cereal", condition: "Passed", status: "Incoming" },
];

export default function WarehouseModule() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Received Items</h2>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-2 px-4">Items</th>
              <th className="py-2 px-4">Condition</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {receivedItems.map((row, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-2 px-4">{row.item}</td>
                <td className="py-2 px-4">{row.condition}</td>
                <td
                  className={`py-2 px-4 font-medium ${
                    row.status === "Incoming"
                      ? "text-green-600"
                      : "text-purple-600"
                  }`}
                >
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
