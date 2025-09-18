import logo from '../assets/logo.png'
export const Header = () => {
	return(
		<header className="w-full flex bg-purple-300">
			<img src={logo} className='h-20'/>
			<h1>Admin</h1>
		</header>
	);
}