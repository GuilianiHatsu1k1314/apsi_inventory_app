export default function LoginForm() {
	return(
		<form>
			<input 
				type="text"
				placeholder="Username"
			/>
			<input 
				type="password"
				placeholder="Password"
			/>
			<button>
				Submit
			</button>
		</form>
	);
}