import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskPriority, TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
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
