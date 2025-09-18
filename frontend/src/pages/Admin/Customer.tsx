import { OrderSummary } from "../../components/Customer/OrderSummary";
import { RetailersTable } from "../../components/Customer/RetailersTable";
import { StoreOrdersTable } from "../../components/Customer/StoreOrdersTable";

export const Customer = () => {
  return (
    <main className="p-6 w-full">
      <div className="grid grid-cols-3 gap-6 mb-6">
        <OrderSummary />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <RetailersTable />
        <StoreOrdersTable />
      </div>
    </main>
  );
}
