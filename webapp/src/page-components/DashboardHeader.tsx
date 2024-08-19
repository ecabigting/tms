import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { currentUser } from "../../utils/sessions";

type Props = {};

const DashboardHeader = async (props: Props) => {
	const loggedInUser = await currentUser();
	const initials = loggedInUser.name
		? loggedInUser.name
				.split(" ")
				.map((word: string) => word.charAt(0))
				.join("")
		: "";
	return (
		<div className='my-5 flex justify-between'>
			{/* LEFT */}
			<div>Logo</div>
			{/* RIGHT */}
			<div>
				<Avatar>
					<AvatarImage src={loggedInUser.image ?? ""} className='p-1 size-10 border-1 rounded-full' />
					<AvatarFallback className='border-1 rounded-full bg-blue-200 p-1'>{initials}</AvatarFallback>
				</Avatar>
			</div>
			{/* {JSON.stringify(loggedInUser)} */}
		</div>
	);
};

export default DashboardHeader;
