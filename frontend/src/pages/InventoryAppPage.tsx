import { Header } from "../components/Header";
import { NavBar } from "../components/SideBar/SideBarNav";

export const InventoryAppPage = () => {
  return(
  	<main className="h-screen overflow-hidden">
			<Header />
			<NavBar />
		</main> 
	);
}