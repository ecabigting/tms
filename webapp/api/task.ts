"use server";
import * as z from "zod";
import { TaskSchema } from "../schemas/tasks";
import { currentUser } from "../utils/sessions";
import { requestDeleteBuilder, requestGetBuilder, requestPostBuilder, requestPutBuilder } from "../utils/utils";

export const getTaskSummary = async (): Promise<any> => {
	const loggedInUser = await currentUser();
	const res = await requestGetBuilder("task/summary", loggedInUser.access.accessToken);
	return res;
};

export const getHighPriorityTask = async (): Promise<any> => {
	const loggedInUser = await currentUser();
	const res = await requestGetBuilder("task/highprioritytasks", loggedInUser.access.accessToken);
	return res;
};

export const getTaskPriorityBreakDown = async (): Promise<any> => {
	const loggedInUser = await currentUser();
	const res = await requestGetBuilder("task/prioritysummary", loggedInUser.access.accessToken);
	return res;
};

export const getAssignedTask = async (): Promise<any> => {
	const loggedInUser = await currentUser();
	const res = await requestGetBuilder("task/assingedtask", loggedInUser.access.accessToken);
	return res;
};

export const getTaskById = async ({ id }: { id: string }): Promise<any> => {
	const loggedInUser = await currentUser();
	const res = await requestGetBuilder(`task/${id}`, loggedInUser.access.accessToken);
	return res;
};

export const verifyTaskSubmit = async (values: z.infer<typeof TaskSchema>): Promise<any> => {
	const validatedFileds = TaskSchema.safeParse(values);
	if (!validatedFileds.success) return { error: "Please verify form fields" };
	const { _id } = validatedFileds.data;
	try {
		if (_id == "") {
			return await createTask(values);
		} else {
			return await updateTask(validatedFileds.data);
		}
	} catch (error) {
		throw error;
	}
};

export const updateTask = async (values: any) => {
	const loggedInUser = await currentUser();
	const res = await requestPutBuilder(`task/${values._id}`, values, loggedInUser.access.accessToken);
	return res;
};

export const createTask = async (values: any) => {
	const loggedInUser = await currentUser();
	const res = await requestPostBuilder(`task/`, values, loggedInUser.access.accessToken);
	return res;
};

export const getAllTasks = async (): Promise<any> => {
	const loggedInUser = await currentUser();
	const res = await requestGetBuilder("task/", loggedInUser.access.accessToken);
	return res;
};

export const deleteTask = async (id: string): Promise<any> => {
	const loggedInUser = await currentUser();
	console.log("task to delete", id);
	const res = await requestDeleteBuilder(`task/${id}`, loggedInUser.access.accessToken);
	return res;
};
