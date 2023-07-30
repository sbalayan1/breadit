import Link from "next/link"
import { Icons } from "./Icons"
import { buttonVariants } from "./ui/Button" // these buttonVarints come imported and were prebuilt in the starter code. These buttonVariants are only applied to the button element. In our case we want to render a Link that acts like a button! This applies the standard classes to our Link component as well as the default variant!

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
				<Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
				<Link href='/' className='flex items-center gap-2'>
					<p className='hidden text-zinc-700 text-sm font-medium md:block'>Breadit</p>
				</Link>

				{/* search bar */}

				<Link href='/sign-in' className={buttonVariants()}></Link>
			</div>
		</div>
	)
}

export default Navbar