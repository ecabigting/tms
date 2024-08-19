"use client";
import * as z from "zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { TaskSchema } from "../../schemas/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyTaskSubmit } from "../../api/task";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/spinner";
import { CalendarIcon, CheckCircle2Icon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "../../hooks/GetCurrentUser";
import { useToast } from "@/components/ui/use-toast";

export default function NewTaskForm({ userList }: any) {
	const { toast } = useToast();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
	const [dueDate, setDueDate] = useState<Date>(new Date());
	const [assignToId, setAssignToId] = useState("");
	const [taskStatus, setTaskStatus] = useState("Pending");
	const [taskPriority, setTaskPriority] = useState("Low");
	const [calendarOpen, setCalendarOpen] = useState(false);
	const currentUser = getCurrentUser();
	const [assignToName, setAssignToName] = useState(userList.filter((us: any) => us._id === currentUser.id)[0].name);
	const form = useForm<z.infer<typeof TaskSchema>>({
		resolver: zodResolver(TaskSchema),
		defaultValues: {
			_id: "",
			assignedToId: currentUser.id,
			description: "",
			dueDate: new Date(),
			Priority: "Low",
			status: "Pending",
			title: "",
		},
	});
	const onFormSubmit = (values: z.infer<typeof TaskSchema>) => {
		const validatedFileds = TaskSchema.safeParse(values);
		console.log(values);
		setError("");
		setSuccess("");
		startTransition(() => {
			verifyTaskSubmit(values)
				.then((data) => {
					if (data?.error) {
						setError(data?.error);
					} else {
						console.log(" show toast maybe?");
						toast({
							description: (
								<div className='flex gap-2'>
									<CheckCircle2Icon className=' text-green-600 ' />
									Task Created!
								</div>
							),
							variant: "default",
						});
					}
					console.log(data);
				})
				.catch(() => setError("Something Went Wrong! Please contact support!"));
		});
	};
	return (
		<div className='p-11'>
			<Form {...form}>
				<span></span>
				<form onSubmit={form.handleSubmit(onFormSubmit)} className='space-y-6'>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='_id'
							render={({ field }) => (
								<FormItem className='hidden'>
									<FormLabel className='text-black'>ID:</FormLabel>
									<FormControl className='bg-white'>
										<Input disabled={isPending} {...field} placeholder='ID' type='text' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-black'>Title:</FormLabel>
									<FormControl className='bg-white'>
										<Input disabled={isPending} {...field} placeholder='Title' type='text' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-black'>Description:</FormLabel>
									<FormControl className='bg-white'>
										<Textarea disabled={isPending} {...field} placeholder='Description' className='h-12' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='dueDate'
							render={({ field }) => {
								return (
									<FormItem className='flex flex-col'>
										<FormLabel>Due Date</FormLabel>
										<Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"w-[240px] pl-3 text-left font-normal",
															!field.value && "text-muted-foreground"
														)}
													>
														{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
														<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className='w-auto p-0' align='start'>
												<Calendar
													mode='single'
													selected={new Date(field.value)}
													onSelect={field.onChange}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormDescription>Select the due date for the task.</FormDescription>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name='status'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Task Status</FormLabel>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant='outline'>{taskStatus}</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className='w-56'>
											<DropdownMenuLabel>Task Status</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuRadioGroup
												value={taskStatus}
												onValueChange={(value) => {
													setTaskStatus(value);
													field.onChange(value); // Update the form field value
												}}
											>
												<DropdownMenuRadioItem value='Pending'>Pending</DropdownMenuRadioItem>
												<DropdownMenuRadioItem value='InProgress'>In Progress</DropdownMenuRadioItem>
												<DropdownMenuRadioItem value='Completed'>Completed</DropdownMenuRadioItem>
											</DropdownMenuRadioGroup>
										</DropdownMenuContent>
									</DropdownMenu>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='assignedToId'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Assign To</FormLabel>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant='outline'>{assignToName}</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className='w-56'>
											<DropdownMenuLabel>Select Member</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuRadioGroup
												value={assignToName}
												onValueChange={(value) => {
													const selectedName = userList.filter((us: any) => us._id === value);
													setAssignToName(selectedName[0].name);
													setAssignToId(value);
													field.onChange(value);
													console.log(userList);
												}}
											>
												{userList.map((u: any) => {
													return (
														<DropdownMenuRadioItem key={u._id} value={u._id}>
															{u.name}
														</DropdownMenuRadioItem>
													);
												})}
											</DropdownMenuRadioGroup>
										</DropdownMenuContent>
									</DropdownMenu>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='Priority'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Task Priority</FormLabel>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant='outline'>{taskPriority}</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className='w-56'>
											<DropdownMenuLabel>Task Status</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuRadioGroup
												value={taskPriority}
												onValueChange={(value) => {
													setTaskPriority(value);
													field.onChange(value); // Update the form field value
												}}
											>
												<DropdownMenuRadioItem value='Low'>Low</DropdownMenuRadioItem>
												<DropdownMenuRadioItem value='Medium'>Medium</DropdownMenuRadioItem>
												<DropdownMenuRadioItem value='High'>High</DropdownMenuRadioItem>
											</DropdownMenuRadioGroup>
										</DropdownMenuContent>
									</DropdownMenu>
								</FormItem>
							)}
						/>
					</div>
					<Button className='w-full bg-blue-400 text-white hover:bg-blue-700' disabled={isPending}>
						Save
						{isPending && <LoadingSpinner className='ml-31' />}
					</Button>
				</form>
			</Form>
		</div>
	);
}
