// src/components/customer/OrderSummary.tsx
export const OrderSummary = () => {
  const summary = [
    { label: "Completed", value: 3, color: "bg-green-500" },
    { label: "Pending", value: 2, color: "bg-yellow-400" },
    { label: "Cancelled", value: 1, color: "bg-red-500" },
  ];

  return (
    <>
      {summary.map((item, i) => (
        <div
          key={i}
          className="bg-white shadow-md rounded-xl p-4 flex items-center gap-3"
        >
          <span className={`h-4 w-4 rounded-full ${item.color}`}></span>
          <div>
            <h2 className="font-semibold">{item.label}</h2>
            <p className="text-xl font-bold">{item.value}</p>
          </div>
        </div>
      ))}
    </>
  );
};
