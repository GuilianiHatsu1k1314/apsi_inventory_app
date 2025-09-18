export const LeastOrderedItems = () => {
  const items = [
    { name: "Bananas", value: 15 },
    { name: "Garlic", value: 10 },
    { name: "Ice Cream", value: 8 },
    { name: "Candy", value: 12 },
    { name: "Fillet o Fish", value: 5 },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-3">Least Ordered Items</h2>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center">
            <span className="w-24">{item.name}</span>
            <div className="flex-1 bg-gray-200 h-4 rounded">
              <div
                className="bg-lime-400 h-4 rounded"
                style={{ width: `${item.value * 2}%` }}
              ></div>
            </div>
            <span className="ml-2">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
