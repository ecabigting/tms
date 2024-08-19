"use client";

import React, { useState } from "react";
import { IoIosHome, IoIosListBox, IoIosLogOut, IoMdClose, IoMdMenu } from "react-icons/io";
import { getCurrentUser } from "../../hooks/GetCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { logout } from "../../api/logout";
import Link from "next/link";

const menuItems = [
	{
		icons: <IoIosHome size={30} />,
		label: "Home",
		path: "/dashboard",
	},
	{
		icons: <IoIosListBox size={30} />,
		label: "Tasks",
		path: "/task",
	},
];

export default function Sidebar() {
	const userInfo = getCurrentUser();
	const initials = userInfo.name
		? userInfo.name
				.split(" ")
				.map((word: string) => word.charAt(0))
				.join("")
		: "";
	const [open, setOpen] = useState(true);
	const signOutOnClick = () => {
		logout();
	};

	return (
		<nav className={`shadow-md h-screen p-2 flex flex-col duration-500 bg-white text-black ${open ? "w-60" : "w-16"}`}>
			<div className=' px-3 py-2 h-20 flex justify-end items-center'>
				{/* <img src={logo} alt='Logo' className={`${open ? "w-10" : "w-0"} rounded-md`} /> */}
				{open && <IoMdClose size={23} className={`cursor-pointer`} onClick={() => setOpen(!open)} />}
				{!open && <IoMdMenu size={23} className={`cursor-pointer`} onClick={() => setOpen(!open)} />}
			</div>
			<ul className='flex-1'>
				{menuItems.map((item, index) => {
					return (
						<li key={index} className='px-3 py-2 my-2 hover:bg-blue-100 rounded-md duration-300 cursor-pointer '>
							<Link href={item.path} className='flex gap-2 items-center relative group'>
								<div>{item.icons}</div>
								<span className={`${!open && "w-0 translate-x-24"} duration-500 overflow-hidden`}>{item.label}</span>
								<span
									className={`${
										open && "hidden"
									} absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16 `}
								>
									{item.label}
								</span>
							</Link>
						</li>
					);
				})}
			</ul>
			<div className={`${"px-2 py-2 my-2 hover:bg-blue-100 rounded-md"}`}>
				<button onClick={signOutOnClick} className='flex items-center justify-evenly gap-1 '>
					<IoIosLogOut size={30} />
					<p className={`leading-5 ${!open && "w-0 translate-x-24"} duration-500 overflow-hidden text-nowrap`}>
						Sign Out
					</p>
				</button>
			</div>
			<div className={`${open && ""} px-2 flex items-center justify-start gap-1`}>
				<Avatar>
					<AvatarImage src={userInfo.image ?? ""} className='size-6 border-1 rounded-full' />
					<AvatarFallback className='border-1 rounded-full bg-blue-200 p-1'>
						{initials.length > 2 ? initials.substring(1) : initials}
					</AvatarFallback>
				</Avatar>
				<div className={`leading-5 ${!open && "w-0 translate-x-24"} duration-500 overflow-hidden text-nowrap`}>
					<p className='text-xs'>{userInfo.name}</p>
					<p className='text-[10px] text-gray-700 leading-3'>{userInfo.email}</p>
				</div>
			</div>
		</nav>
	);
}
