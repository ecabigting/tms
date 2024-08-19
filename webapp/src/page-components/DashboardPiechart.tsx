"use client";

import * as React from "react";
import { TrendingUp, TrendingUpIcon } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
const chartConfig = {
	tasks: {
		label: "Tasks",
	},
	completedTasks: {
		label: "Completed Task",
		color: "chartreuse",
	},
	inProgressTasks: {
		label: "In Progress",
		color: "yellow",
	},
	pendingTasks: {
		label: "Pending",
		color: "gainsboro",
	},
} satisfies ChartConfig;

export function DashboardPiechart({ taskSummary }: any) {
	let summaryChartData = [
		{
			summary: "completedTasks",
			task: taskSummary.completedTasks,
			fill: "chartreuse",
		},
		{
			summary: "inProgressTasks",
			task: taskSummary.inProgressTasks,
			fill: "yellow",
		},
		{ summary: "pendingTasks", task: taskSummary.pendingTasks, fill: "gainsboro" },
	];
	const totalTasks = React.useMemo(() => {
		return summaryChartData.reduce((acc, curr) => acc + curr.task, 0);
	}, []);
	return (
		<Card className='flex flex-col w-[100%]'>
			<CardHeader className='items-center pb-0'>
				<CardTitle>Task Summary</CardTitle>
			</CardHeader>
			<CardContent className='flex-1 pb-0'>
				<ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[250px]'>
					<PieChart>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Pie data={summaryChartData} dataKey='task' nameKey='summary' innerRadius={60} strokeWidth={5}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
												<tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-3xl font-bold'>
													{totalTasks.toLocaleString()}
												</tspan>
												<tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
													Total Tasks
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col gap-2 text-sm'>
				<div className='flex items-center gap-2 font-medium leading-none'>
					{Math.trunc((taskSummary.completedTasks / taskSummary.totalsTasks) * 100)}% Completed task <TrendingUpIcon />
				</div>
				<div className='leading-none text-muted-foreground'>Showing Total Task</div>
			</CardFooter>
		</Card>
	);
}
