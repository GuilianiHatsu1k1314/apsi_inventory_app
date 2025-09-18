export const MostOrderedItems = () => {
    const items = [
    { name: "Bananas", value: 40 },
    { name: "Garlic", value: 25 },
    { name: "Ice Cream", value: 20 },
    { name: "Candy", value: 30 },
    { name: "Fillet o Fish", value: 15 },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-3">Most Ordered Items</h2>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center">
            <span className="w-24">{item.name}</span>
            <div className="flex-1 bg-gray-200 h-4 rounded">
              <div
                className="bg-blue-500 h-4 rounded"
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
            <span className="ml-2">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}