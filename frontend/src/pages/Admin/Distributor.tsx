import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/SupabaseClient";

interface Supplier {
  id: string;
  name: string;
  items: string;
  amount: number;
  price: number;
}

export const Distributor: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  //Fetch suppliers from Supabase
  useEffect(() => {
    const fetchSuppliers = async () => {
      const { data, error } = await supabase.from("suppliers").select("*");
      if (error) {
        console.error("Error fetching suppliers:", error.message);
      } else {
        setSuppliers(data as Supplier[]);
      }
      setLoading(false);
    };
    fetchSuppliers();
  }, []);

  useEffect(()=>{
    document.title = "Distributor";
  },[]);

  //Handle input changes
  const handleChange = (
    index: number,
    field: keyof Supplier,
    value: string | number
  ) => {
    const updated = [...suppliers];
    updated[index] = { ...updated[index], [field]: value };
    setSuppliers(updated);
  };

  //Add new supplier (with empty fields)
  const addSupplier = async () => {
    const { data, error } = await supabase
      .from("suppliers")
      .insert([{ name: "", items: "", amount: 0, price: 0 }])
      .select();

    if (error) {
      console.error("Error adding supplier:", error.message);
      return;
    }
    if (data) setSuppliers((prev) => [...prev, data[0] as Supplier]);
  };

  //Save updates to a supplier
  const saveSupplier = async (supplier: Supplier) => {
    const { error } = await supabase
      .from("suppliers")
      .update({
        name: supplier.name,
        items: supplier.items,
        amount: supplier.amount,
        price: supplier.price,
      })
      .eq("id", supplier.id);

    if (error) {
      console.error("Error saving supplier:", error.message);
      alert("Failed to save supplier");
      return;
    }
    alert("Supplier updated");
  };

  //Supply goods THEN goes into received_goods
  const handleSupply = async (supplier: Supplier) => {
    const { error } = await supabase.from("received_goods").insert([
      {
        name: supplier.items,
        quantity: supplier.amount,
        price: supplier.price,
        status: "Pending",
      },
    ]);

    if (error) {
      console.error("Error supplying goods:", error.message);
      alert("Failed to supply goods");
      return;
    }

    alert(
      `${supplier.name} supplied ${supplier.amount} of ${supplier.items}`
    );
  };

  if (loading) return <p className="p-6">Loading suppliers...</p>;

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Suppliers</h2>
        <button
          onClick={addSupplier}
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add New Supplier
        </button>

        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Items</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr
                key={supplier.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={supplier.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                    className="border p-1 w-full"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={supplier.items}
                    onChange={(e) =>
                      handleChange(index, "items", e.target.value)
                    }
                    className="border p-1 w-full"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="number"
                    value={supplier.amount}
                    onChange={(e) =>
                      handleChange(index, "amount", Number(e.target.value))
                    }
                    className="border p-1 w-24"
                    min={1}
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="number"
                    value={supplier.price}
                    onChange={(e) =>
                      handleChange(index, "price", Number(e.target.value))
                    }
                    className="border p-1 w-24"
                    min={0}
                  />
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => saveSupplier(supplier)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleSupply(supplier)}
                    className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                  >
                    Supply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
