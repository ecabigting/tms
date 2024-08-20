import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./tasks/taskSlice";
import { TaskState } from "./tasks/taskSlice";

export const store = configureStore({
	reducer: {
		tasks: taskReducer,
		// highPriority
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export enum TaskStateStatus {
	idle = "idle",
	loading = "loading",
	succeeded = "succeeded",
	failed = "failed",
}
