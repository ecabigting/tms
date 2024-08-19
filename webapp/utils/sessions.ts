import { User } from "next-auth";
import { auth } from "@/auth";
export const currentUser = async (): Promise<any> => {
	const session = await auth();
	return session?.user as User;
};
