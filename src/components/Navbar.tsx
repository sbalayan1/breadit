import Link from "next/link"

const Navbar = () => {
	return (
		// inset-x-0 sets left and right to 0px
		// h-fit, sets a height matching the content of the navbar
		// z-[10] makes the div stick out above the other content
		// container auto applies margin, padding, width. Feel free to take a look at the container class created in the tailwind config
		// gap-2 provides some gap for the responsive view
		<div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2'>
			<div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
				{/* logo */}
				<Link href='/' className='flex items-center gap-2'>
					<p className='hidden text-zinc-700 text-sm font-medium md:block'>Breadit</p>
				</Link>
			</div>
		</div>
	)
}

export default Navbar