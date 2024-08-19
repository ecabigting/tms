import * as z from "zod";

export const TaskSchema = z.object({
	_id: z.string(),
	title: z
		.string({
			message: "Title is required",
		})
		.min(3, {
			message: "Title must contain atleast 3 characters required",
		}),
	description: z.string({
		message: "Description is required",
	}),
	dueDate: z.date(),
	status: z.enum(["Pending", "InProgress", "Completed"]),
	assignedToId: z.string({
		message: "Select member to assign task",
	}),
	Priority: z.enum(["Low", "Medium", "High"]),
});
