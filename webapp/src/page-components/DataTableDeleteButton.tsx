import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle2Icon, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { deleteTaskById } from "../../store/tasks/taskSlice";
import { useToast } from "@/components/ui/use-toast";

type Props = {
	id: string;
	taskname: string;
};

function DataTableDeleteButton({ id, taskname }: Props) {
	const { toast } = useToast();
	const dispatch = useDispatch<AppDispatch>();
	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='h-8 w-8 p-0'>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem>
						<Link href={`/task/${id}`}>View Task</Link>
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => {
							dispatch(deleteTaskById(id));
							toast({
								description: (
									<div className='flex gap-2'>
										<CheckCircle2Icon className=' text-white-600 ' />
										Task '{taskname}' was deleted!
									</div>
								),
								variant: "destructive",
							});
						}}
					>
						{" "}
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export default DataTableDeleteButton;
