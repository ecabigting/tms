"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { LoginSchema } from "../../schemas/user";
import { useForm } from "react-hook-form";
import { VerifyLogin } from "../../api/login";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CardWrapper } from "./CardWrapper";
import { Input } from "@/components/ui/input";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/spinner";

export const LoginForm = () => {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onFormSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError("");
		setSuccess("");
		values.email = values.email.toLowerCase();
		startTransition(() => {
			VerifyLogin(values)
				.then((data) => {
					if (data?.error) {
						form.reset();
						setError(data?.error);
					}
				})
				.catch(() => setError("Something Went Wrong! Please contact support!"));
		});
	};

	return (
		<CardWrapper
			// headerLabel='Welcome back'
			headerLabel='Login'
			backButtonLabel="Don't have an account?"
			backButtongHref='/auth/register'
			showSocial
		>
			<Form {...form}>
				<span></span>
				<form onSubmit={form.handleSubmit(onFormSubmit)} className='space-y-6'>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-black'>Email:</FormLabel>
									<FormControl className='bg-white'>
										<Input disabled={isPending} {...field} placeholder='your@email.com' type='email' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-black'>Password:</FormLabel>
									<FormControl className='bg-white'>
										<Input {...field} disabled={isPending} placeholder='******' type='password' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button className='w-full bg-blue-400 text-white hover:bg-blue-700' disabled={isPending}>
						{/* {showTwoFactor === true ? "Confirm" : "Login"} */}
						Login
						{isPending && <LoadingSpinner className='ml-31' />}
					</Button>
					{/* <Button size='sm' variant='link' asChild className='px-0 font-normal'>
						<Link href='/auth/reset'>Forgot Password?</Link>
					</Button> */}
				</form>
			</Form>
		</CardWrapper>
	);
};
