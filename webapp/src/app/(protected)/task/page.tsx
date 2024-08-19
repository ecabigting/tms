import React from "react";
import { getAssignedTask } from "../../../../api/task";
import { AssignedTaskTable } from "@/page-components/AssignedTaskTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

export default async function Task() {
	const assignedTask = await getAssignedTask();
	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-lg lg:text-xl'>Task</h1>

			<div className='p-3 flex flex-col'>
				<div className='flex justify-between mx-auto w-full py-8 align-middle'>
					<h4 className='align-middle'>Your Assigned Task</h4>
					<Button className='w-52 bg-blue-400 text-white hover:bg-blue-700 '>
						<Link href='task/new'>Create New Task</Link>
					</Button>
				</div>

				<div>
					{assignedTask ? (
						<AssignedTaskTable data={assignedTask} />
					) : (
						<div className='p-12 mx-auto text-gray-500 flex flex-col'>
							<h3>No Task Yet</h3>
							<Button className='w-52 bg-blue-400 text-white hover:bg-blue-700 '>
								<Link href={`task/new`}>Create New Task</Link>
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
