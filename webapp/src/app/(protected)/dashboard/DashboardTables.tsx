"use client";
import DashboardAllTasksTable from "@/page-components/DashboardAllTasksTable";
import { DashboardHighPrioTable } from "@/page-components/DashboardHighPrioTable";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../../../store";
import DashboardHighPrioTaskTable from "@/page-components/DashboardHighPrioTaskTable";

type Props = {};

function DashboardTables({}: Props) {
	return (
		<Provider store={store}>
			<div>
				<div className=' '>
					<h2 className='py-5'>High Priority Task</h2>
					<DashboardHighPrioTaskTable />
				</div>
				<div className=' '>
					<h2 className='py-5'>All Task</h2>
					<DashboardAllTasksTable />
				</div>
			</div>
		</Provider>
	);
}

export default DashboardTables;
