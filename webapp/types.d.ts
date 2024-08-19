// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { UserRole } from "@prisma/client";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	/**
	 * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			id: string;
			role: UserRole;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `auth`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		idToken?: string;
		role: UserRole;
	}
}
