import { IsDate, IsString } from 'class-validator';
import { TaskPriority, TaskStatus } from '../entities/task.entity';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString({ message: 'Title is required.' })
  title: string;

  @IsString({ message: 'Description is required.' })
  description: string;

  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @IsString()
  status: TaskStatus;

  @IsString()
  assignedToId: string;

  @IsString()
  Priority: TaskPriority;
}
