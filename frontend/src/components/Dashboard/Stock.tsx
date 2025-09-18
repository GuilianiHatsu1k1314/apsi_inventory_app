export const Stock = () => {
    const stock = [
    { item: "Bananas", stock: 25, orders: 25, price: 59 },
    { item: "Garlic", stock: 20, orders: 20, price: 43 },
    { item: "Ice Cream", stock: 19, orders: 19, price: 29 },
    { item: "Candy", stock: 15, orders: 15, price: 21 },
    { item: "Fillet o Fish", stock: 14, orders: 14, price: 14 },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-3">In Stock</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">Item</th>
            <th className="p-2">In Stock</th>
            <th className="p-2">Monthly Orders</th>
            <th className="p-2">Unit Price</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((s, i) => (
            <tr key={i} className="border-b last:border-0">
              <td className="p-2">{s.item}</td>
              <td className="p-2">{s.stock}</td>
              <td className="p-2">{s.orders}</td>
              <td className="p-2">₱{s.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}