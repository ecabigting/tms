"use client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Logo from "@/public/adnoc_marathon_logo.png";
import { Header } from "./Header";

interface CardWrapperProps {
	children: React.ReactNode;
	headerLabel: string;
	backButtonLabel: string;
	backButtongHref: string;
	showSocial?: boolean;
}

export const CardWrapper = ({
	children,
	backButtonLabel,
	backButtongHref,
	headerLabel,
	showSocial,
}: CardWrapperProps) => {
	return (
		<Card className='w-[400px] shadow-md bg-main-dark'>
			<CardHeader>
				{/* <img src={Logo.src} className='h-24' /> */}
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent>{children}</CardContent>
			{/* {showSocial && (
				<CardFooter>
					<Social />
				</CardFooter>
			)} */}
			{/* <CardFooter>
				<BackButton label={backButtonLabel} href={backButtongHref} />
			</CardFooter> */}
		</Card>
	);
};
