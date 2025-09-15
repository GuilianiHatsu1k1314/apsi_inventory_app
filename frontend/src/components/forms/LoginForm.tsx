export default function LoginForm() {
	return(
		<form className="flex flex-col w-sm p-14 pt-0 gap-8">
			<input 
				type="text"
				placeholder="Username"
				className="border-3 p-2 font-semibold 
									 placeholder-[var(--dali-purple)]
									 border-[var(--dali-purple)] rounded-[16px]
									 focus:border-violet-600 focus:outline-none"
			/>
			<input 
				type="password"
				placeholder="Password"
				className="border-3 p-2 font-semibold
								   placeholder-[var(--dali-purple)]
									 border-[var(--dali-purple)] rounded-[16px]
									 focus:border-violet-600 focus:outline-none"
			/>
			<button 
				type="submit"
				className="w-34 px-4 py-3 self-center bg-[var(--dali-purple)] text-white font-semibold rounded-[17px]
									 hover:bg-violet-600"
			>
				Submit
			</button>
		</form>
	);
}