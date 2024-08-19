"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { deleteTask } from "../../../api/task";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type HighPriorityTask = {
	_id: string;
	title: string;
	description: string;
	dueDate: Date;
	assignedToName: string;
	createdAt: Date;
};

export const highPrioColum: ColumnDef<HighPriorityTask>[] = [
	{
		accessorKey: "_id",
	},
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => {
			const value = row.getValue("title") as string;
			return <div className='text-left text-clip max-w-xs min-h-10'>{value}</div>;
		},
	},
	{
		accessorKey: "dueDate",
		header: "Due Date",
		cell: ({ row }) => {
			const value = new Date(row.getValue("dueDate") as string);
			const options = {
				weekday: "short",
				month: "short",
				day: "numeric",
				year: "numeric",
			} as const;
			const formattedDate = value.toLocaleDateString(undefined, options);
			return <div className='text-center'>{formattedDate}</div>;
		},
	},
	{
		accessorKey: "assignedToName",
		header: "Assigned To",
	},
	{
		accessorKey: "createdAt",
		header: "Created Date",
		cell: ({ row }) => {
			const value = new Date(row.getValue("createdAt") as string);
			const options = {
				weekday: "short",
				month: "short",
				day: "numeric",
				year: "numeric",
			} as const;
			const formattedDate = value.toLocaleDateString("en-US", options);
			return <div className='text-center'>{formattedDate}</div>;
		},
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			const handleDeleteOnClick = async (id: any) => {
				await deleteTask(id);
				window.location.reload();
			};
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem>
							<Link href={`/task/${row.getValue("_id") as string}`}>View Task</Link>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								handleDeleteOnClick(row.getValue("_id") as string);
							}}
						>
							{" "}
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
