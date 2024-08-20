"use client";
import React, { useEffect } from "react";
import { DashboardHighPrioDataTable } from "./DashboardTables/data-table";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../store/tasks/taskSlice";
import { highPrioColum } from "./DashboardTables/columns";
import { AppDispatch, RootState, TaskStateStatus } from "../../store";

function DashboardAllTasksTable() {
	const dispatch = useDispatch<AppDispatch>();
	const tasks = useSelector((state: RootState) => state.tasks.tasks);
	const status = useSelector((state: RootState) => state.tasks.status);
	const error = useSelector((state: RootState) => state.tasks.error);

	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch]);
	return (
		<>
			{status === TaskStateStatus.succeeded && (
				<div>
					<DashboardHighPrioDataTable columns={highPrioColum} data={tasks as any} />
					{/* should load datatable now
					{JSON.stringify(tasks)} */}
				</div>
			)}
		</>
	);
}

export default DashboardAllTasksTable;
