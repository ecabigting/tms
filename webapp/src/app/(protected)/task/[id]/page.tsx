import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getTaskById } from "../../../../../api/task";
import TaskForm from "@/page-components/TaskForm";
import { getAllUsers } from "../../../../../api/user";

export default async function EditTask({ params }: { params: { id: string } }) {
	const { id } = params;
	const foundTask = await getTaskById(params);
	const foundUser = await getAllUsers();
	return (
		<div className='flex flex-col'>
			<h1>Edit Task</h1>
			{foundTask ? (
				<TaskForm task={foundTask} userList={foundUser} />
			) : (
				<div className='p-12 mx-auto text-gray-500'>
					<h3>Cannot find task with id {id}</h3>
				</div>
			)}
		</div>
	);
}
