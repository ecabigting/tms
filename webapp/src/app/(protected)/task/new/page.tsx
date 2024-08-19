import * as React from "react";

import { getAllUsers } from "../../../../../api/user";
import NewTaskForm from "@/page-components/NewTaskForm";

export default async function NewTask() {
	const foundUser = await getAllUsers();

	return (
		<div>
			<h1>Create New Task</h1>
			<NewTaskForm userList={foundUser} />
		</div>
	);
}
