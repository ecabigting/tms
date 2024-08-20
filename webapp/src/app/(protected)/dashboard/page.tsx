"use server";
import { DashboardPiechart } from "@/page-components/DashboardPiechart";
import { getAllTasks, getHighPriorityTask, getTaskPriorityBreakDown, getTaskSummary } from "../../../../api/task";
import { currentUser } from "../../../../utils/sessions";
import { DashboardHighPrioTable } from "@/page-components/DashboardHighPrioTable";
import { DashboardHorizontalBarChart } from "@/page-components/DashboardHorizontalBarChart";
import DashboardAllTasksTable from "@/page-components/DashboardAllTasksTable";
import DashboardTables from "./DashboardTables";

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
				<div>
					<DashboardTables />
				</div>
			</div>
		</div>
	);
}
