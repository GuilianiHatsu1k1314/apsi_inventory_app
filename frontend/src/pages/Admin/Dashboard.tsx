import { LeastOrderedItems } from "../../components/Dashboard/LeastOrdered";
import { MostOrderedItems } from "../../components/Dashboard/MostOrdered";
import { Stock } from "../../components/Dashboard/Stock"
import { TopCustomer } from "../../components/Dashboard/TopCustomer";

export const Dashboard = () => {
	return(
    <main className="p-6 w-full">
      <div className="grid grid-cols-3 gap-6">
        
        <div className="col-span-1 space-y-6">
          <TopCustomer />
        </div>

        <div className="col-span-2 space-y-6">
          <Stock />

          <div className="grid grid-cols-2 gap-6">
            <MostOrderedItems />
			<LeastOrderedItems />
          </div>
        </div>
      </div>
    </main>

	);
}