import logo from '../assets/white-logo.png'
export const Header = () => {
	return(
		<header className="w-full p-2 flex bg-[var(--dali-purple)]">
			<img src={logo} className='h-20 ml-2'/>
		</header>
	);
}