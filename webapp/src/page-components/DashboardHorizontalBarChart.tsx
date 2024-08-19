"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
const chartConfig = {
	count: {
		label: "Count",
		color: "blue",
	},
} satisfies ChartConfig;
export function DashboardHorizontalBarChart({ taskPrioritySummary }: { taskPrioritySummary: any }) {
	return (
		<Card className='w-[100%]'>
			<CardHeader>
				<CardTitle>Task Priority Breakdown</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={taskPrioritySummary}
						layout='vertical'
						margin={{
							left: -20,
						}}
					>
						<XAxis type='number' dataKey='count' hide />
						<YAxis
							dataKey='priority'
							type='category'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Bar dataKey='count' fill='var(--color-count)' radius={5} />
					</BarChart>
				</ChartContainer>
			</CardContent>
			{/* <CardFooter className='flex-col items-start gap-2 text-sm'>
				<div className='flex gap-2 font-medium leading-none'>
					Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
				</div>
				<div className='leading-none text-muted-foreground'>Showing total visitors for the last 6 months</div>
			</CardFooter> */}
		</Card>
	);
}
