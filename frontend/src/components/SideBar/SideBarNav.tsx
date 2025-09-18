import {Link} from 'react-router-dom';
export const NavBar = () => {
	return(
		<aside className="h-full w-3xs bg-gray-200">
			<nav className="pt-5">
				<ul>
					<li className="hover:bg-[var(--dali-purple)] hover:text-white"><Link to="/app">Dashboard</Link></li>
					<li className="hover:bg-[var(--dali-purple)] hover:text-white">Customer</li>
					<li className="hover:bg-[var(--dali-purple)] hover:text-white">Distributor</li>
					<li className="hover:bg-[var(--dali-purple)] hover:text-white">Warehouse Module</li>
					<li className="mt-16 hover:bg-[var(--dali-purple)] hover:text-white">Reports</li>
				</ul>
			</nav>
		</aside>
	);
}