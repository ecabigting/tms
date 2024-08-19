"use server";
import { DashboardPiechart } from "@/page-components/DashboardPiechart";
import { getAllTasks, getHighPriorityTask, getTaskPriorityBreakDown, getTaskSummary } from "../../../../api/task";
import { currentUser } from "../../../../utils/sessions";
import { DashboardHighPrioTable } from "@/page-components/DashboardHighPrioTable";
import { DashboardHorizontalBarChart } from "@/page-components/DashboardHorizontalBarChart";

export default async function Dashboard() {
	const loggedInUser = await currentUser();
	const taskSummary = await getTaskSummary();
	const taskPrioritySummary = await getTaskPriorityBreakDown();
	const priorityTask = await getHighPriorityTask();
	const getAllTask = await getAllTasks();

	return (
		<div className='space-y-7'>
			<h1>Welcome back {loggedInUser.name}!</h1>
			<div className='flex gap-3 flex-col'>
				<div className='flex justify-evenly gap-8'>
					<DashboardPiechart taskSummary={taskSummary} />
					<DashboardHorizontalBarChart taskPrioritySummary={taskPrioritySummary} />
				</div>
				<div className=' '>
					<h2 className='py-5'>High Priority Task</h2>
					<DashboardHighPrioTable data={priorityTask} />
				</div>
				<div className=' '>
					<h2 className='py-5'>All Task</h2>
					<DashboardHighPrioTable data={getAllTask} />
				</div>
			</div>
		</div>
	);
}
