import { NextAuthOptions } from "next-auth"
import { db } from "./db"
import { PrismaAdapter } from '@next-auth/prisma-adapter' // comes from next-auth. it is a separate npm package that does not come from next-auth. whenever someone logs in, the corresponding tables will be created in our prisma db
import GoogleProvider from 'next-auth/providers/google'
import { nanoid } from 'nanoid'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db),
	session: {
		strategy: 'jwt'
	},
	pages: {
		signIn: '/sign-in'
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!
		})
	],
	callbacks: {
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id
				session.user.name = token.name
				session.user.email = token.email
				session.user.image = token.picture
				session.user.username = token.username
			}

			return session
		},
		async jwt({ token, user }) {
			const dbUser = await db.user.findFirst({
				where: {
					email: token.email
				}
			})

			// if there is no user in our db
			if (!dbUser) {
				token.id = user!.id // set tokenID to the user's id
				return token
			}

			// if the user 
			if (!dbUser.username) {
				await db.user.update({
					where: {
						id: dbUser.id
					},
					data: {
						username: nanoid(10)
					}
				})
			}

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				picture: dbUser.image,
				username: dbUser.username

			}
		}, 
		redirect() {
			return ('/')
		}

	},

}