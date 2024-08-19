import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import DashboardHeader from "@/page-components/DashboardHeader";
import SideBar from "@/page-components/Sidebar";
import { SessionProvider } from "next-auth/react";

interface ProtectedLayoutProps {
	children: React.ReactNode;
}
const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<div className='flex'>
				<SideBar />
				<div className='w-full h-full flex flex-col p-4'>
					{/* <DashboardHeader /> */}
					{children}
				</div>
				<Toaster />
			</div>
		</SessionProvider>
	);
};

export default ProtectedLayout;
