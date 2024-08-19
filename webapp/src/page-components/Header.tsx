import { LockIcon } from "lucide-react";
import { Poppins } from "next/font/google";

const font = Poppins({
	subsets: ["latin"],
	weight: ["600"],
});

interface HeaderProps {
	label: string;
}

export const Header = ({ label }: HeaderProps) => {
	return (
		<div className='w-full flex gap-y-4 items-center justify-center'>
			<LockIcon className='size-10' />
			<p className='text-black pt-5 text-xl'>{label}</p>
		</div>
	);
};
