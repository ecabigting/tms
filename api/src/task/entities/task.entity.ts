import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Task {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Date })
  dueDate: Date;

  @Prop()
  status: TaskStatus;

  @Prop()
  assignedToName: string;

  @Prop({ type: String, required: true })
  assignedToId: string;

  @Prop({ type: String, required: true })
  createdById: string;

  @Prop({ type: String, required: true })
  updatedById: string;

  @Prop()
  updatedByName: string;

  @Prop()
  createdByName: string;

  @Prop()
  Priority: TaskPriority;

  @Prop()
  isDeleted: boolean;
}

export enum TaskStatus {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed',
}

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface TasksStats {
  totalsTasks: number;
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
