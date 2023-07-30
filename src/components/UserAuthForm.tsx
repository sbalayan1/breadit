'use client'
import React, { FC, useState } from 'react'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react' // signIn is a package available via next-Auth 
import { Icons } from './Icons'
import { useToast } from '@/hooks/use-toast'


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
	
}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { toast } = useToast()
	// className is a dynamic className. it lets us apply styling from the parent of wherever we are rendering the userAuthForm. we do this by extending the interface above with React.HTMLAttributes<HTMLDivElement>.

	const loginWithGoogle = async () => {
		setIsLoading(true)
		try {
			await signIn('google') // signIn function comes from next-auth and we can choose the kind of auth we can sue 
		} catch (error) {
			// toast notification. this comes from the shadcn-ui library which we install via npx shadcn-ui add toast
			toast({
				title: 'There was a problem',
				description: 'There was an error logging in with Google',
				variant: 'destructive'
			})

		} finally {
			setIsLoading(false) // disables the loading state no matter what happens
		}
	}

	return <div className={cn('flex justify-center', className)} {...props} >
		<Button size='sm' className='w-full' onClick={loginWithGoogle} isLoading={isLoading}>
			{isLoading ? null : <Icons.google className='h-4 w-4 mr-2'/>}
			Google
		</Button>
	</div>
}

export default UserAuthForm