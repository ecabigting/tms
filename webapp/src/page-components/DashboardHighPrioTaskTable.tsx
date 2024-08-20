"use client";
import React, { useEffect } from "react";
import { DashboardHighPrioDataTable } from "./DashboardTables/data-table";
import { useDispatch, useSelector } from "react-redux";
import { highPrioColum } from "./DashboardTables/columns";
import { AppDispatch, RootState, store, TaskStateStatus } from "../../store";
import { fetchHighPrioTasks } from "../../store/tasks/taskSlice";

function DashboardHighPrioTaskTable() {
	const dispatch = useDispatch<AppDispatch>();
	const tasks = useSelector((state: RootState) => state.tasks.highPrioTask);
	const status = useSelector((state: RootState) => state.tasks.status);
	const error = useSelector((state: RootState) => state.tasks.error);

	useEffect(() => {
		dispatch(fetchHighPrioTasks());
	}, [dispatch]);
	return (
		<>
			{status === TaskStateStatus.succeeded && (
				<div>
					<DashboardHighPrioDataTable columns={highPrioColum} data={tasks as any} />
				</div>
			)}
		</>
	);
}

export default DashboardHighPrioTaskTable;
