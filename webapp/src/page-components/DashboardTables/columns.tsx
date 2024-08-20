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
import DataTableDeleteButton from "../DataTableDeleteButton";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type HighPriorityTask = {
	_id: string;
	title: string;
	description: string;
	dueDate: Date;
	status: string;
	Priority: string;
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
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const value = row.getValue("status") as string;
			let status = value;
			switch (status) {
				case "Pending":
					return (
						<span className='rounded-md px-2 py-1 text-sm font-medium bg-yellow-100 text-yellow-800'>Pending</span>
					);
				case "InProgress":
					return (
						<span className='rounded-md px-2 py-1 text-sm font-medium bg-blue-100 text-blue-800'>In Progress</span>
					);
				case "Completed":
					return (
						<span className='rounded-md px-2 py-1 text-sm font-medium bg-green-100 text-green-800'>Completed</span>
					);
				default:
					return <span>Unknown</span>;
			}
		},
	},
	{
		accessorKey: "Priority",
		header: "Priority",
		cell: ({ row }) => {
			const value = row.getValue("Priority") as string;
			let priority = value;
			switch (priority) {
				case "Low":
					return <span className='rounded-md px-2 py-1 text-sm font-medium bg-blue-100 text-blue-800'>Low</span>;
				case "Medium":
					return <span className='rounded-md px-2 py-1 text-sm font-medium bg-yellow-100 text-yellow-800'>Medium</span>;
				case "High":
					return <span className='rounded-md px-2 py-1 text-sm font-medium bg-red-100 text-red-800'>High</span>;
				default:
					return <span>Unknown</span>;
			}
		},
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
			return <DataTableDeleteButton id={row.getValue("_id") as string} taskname={row.getValue("title") as string} />;
		},
	},
];
