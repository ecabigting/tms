"use server";
import * as z from "zod";
import { LoginSchema } from "../schemas/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { requestPostBuilder } from "../utils/utils";

export const VerifyLogin = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFileds = LoginSchema.safeParse(values);
	if (!validatedFileds.success) return { error: "Invalid Fields!" };
	const { email, password } = validatedFileds.data;
	try {
		let redirecToPagePerRole = "/dashboard?rf=1";
		await signIn("credentials", { email, password, redirectTo: redirecToPagePerRole, redirect: true });
	} catch (error) {
		if (error instanceof AuthError) {
			console.log(error);
			return { error: "Invalid Credentials" };
		}
		throw error;
	}
};

export const Login = async (email: string, password: string): Promise<any> => {
	const res = await requestPostBuilder("auth/signin", { email, password }, "");
	return res;
};
