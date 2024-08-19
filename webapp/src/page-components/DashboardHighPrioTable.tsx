"use client";
import { highPrioColum } from "./DashboardTables/columns";
import { DashboardHighPrioDataTable } from "./DashboardTables/data-table";

export function DashboardHighPrioTable({ data }: any) {
	return (
		<div className=''>
			<DashboardHighPrioDataTable columns={highPrioColum} data={data} />
		</div>
	);
}
