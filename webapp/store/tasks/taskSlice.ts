"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { deleteTask, getAllTasks, getHighPriorityTask } from "../../api/task";

export enum TaskStateStatus {
	idle = "idle",
	loading = "loading",
	succeeded = "succeeded",
	failed = "failed",
}

interface Task {
	// Define your task interface here
	_id: string;
	title: string;
	// ... other properties
}

export interface TaskState {
	tasks: Task[];
	highPrioTask: Task[];
	status: TaskStateStatus;
	error: string | undefined;
}

const initialState: TaskState = {
	tasks: [],
	highPrioTask: [],
	status: TaskStateStatus.idle,
	error: undefined,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
	const response = await getAllTasks();
	return response as Task[];
});

export const deleteTaskById = createAsyncThunk("tasks/deleteTasks", async (id: string) => {
	const response = await deleteTask(id);
	return id;
});

export const fetchHighPrioTasks = createAsyncThunk("tasks/fetchHighPrioTasks", async () => {
	const response = await getHighPriorityTask();
	return response as Task[];
});

const taskSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.status = TaskStateStatus.loading;
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.status = TaskStateStatus.succeeded;
				state.tasks = action.payload;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.status = TaskStateStatus.failed;
				state.error = action.error.message;
			})
			.addCase(deleteTaskById.fulfilled, (state, action) => {
				state.status = TaskStateStatus.succeeded;
				console.log("ID TO DELETE:", action.payload);
				state.tasks = state.tasks.filter((task) => task._id !== action.payload);
				state.highPrioTask = state.highPrioTask.filter((task) => task._id !== action.payload);
				return state;
			})
			.addCase(fetchHighPrioTasks.fulfilled, (state, action) => {
				state.status = TaskStateStatus.succeeded;
				state.highPrioTask = action.payload;
			});
	},
});

export default taskSlice.reducer;
