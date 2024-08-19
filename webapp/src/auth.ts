import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "../schemas/user";
import { Login } from "../api/login";

export const { handlers, signIn, signOut, auth } = NextAuth({
	pages: { signOut: "/" },
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				const validateFields = LoginSchema.safeParse(credentials);
				if (validateFields.success) {
					const { email, password } = validateFields.data;
					let resp = await Login(email, password);
					return resp;
				}
				return null;
			},
		}),
	],
	session: { strategy: "jwt" },
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider === "google") {
				// console.log({ user });
				// console.log({ account });
			}
			if (account?.provider !== "credentials") return true;
			return true;
		},
		async jwt({ token, user }: { token: any; user: any }) {
			if (user) {
				token.id = user.user.id;
				token.role = user.user.role;
				token.prefix = user.user.prefix;
				token.picture = user.user.image;
				token.email = user.user.email;
				token.access = user.tokens;
				token.name = user.user.name;
			}
			return token;
		},
		async session({ token, session }: { token: any; session: any }) {
			if (token && session) {
				session.user.id = token.id;
				session.user.role = token.role;
				session.user.image = token.picture;
				session.user.email = token.email;
				session.user.access = token.access;
			}
			return session;
		},
	},
});
