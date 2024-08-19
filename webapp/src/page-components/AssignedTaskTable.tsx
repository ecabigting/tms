"use client";

import { taskColumns } from "./TaskTables/columns";
import { AssignedTaskDataTable } from "./TaskTables/data-table";

export function AssignedTaskTable({ data }: any) {
	return (
		<div className=''>
			<AssignedTaskDataTable columns={taskColumns} data={data} />
		</div>
	);
}
