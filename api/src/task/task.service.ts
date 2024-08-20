import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  Task,
  TaskPriority,
  TasksStats,
  TaskStatus,
} from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { getMondayAndFridayDates } from 'src/utils/utils';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto, creatorId: string): Promise<Task> {
    const taskCreatorDetails = await this.userModel.findById(creatorId);
    if (!taskCreatorDetails)
      throw new BadRequestException('Invalid Task Creator ID.', {
        cause: new Error(),
        description: 'Invalid Task Creator ID.',
      });

    const taskAssigneeDetails = await this.userModel.findById(
      createTaskDto.assignedToId,
    );

    if (!taskAssigneeDetails)
      throw new BadRequestException('Invalid Task Assignee ID.', {
        cause: new Error(),
        description: 'Invalid Task Assignee ID.',
      });

    console.log('>>> New Task DTO', createTaskDto);
    const newTask = new this.taskModel({
      title: createTaskDto.title,
      description: createTaskDto.description,
      createdByName: taskCreatorDetails.name,
      createdById: taskCreatorDetails.id,
      assignedToName: taskAssigneeDetails.name,
      assignedToId: taskAssigneeDetails.id,
      updatedById: taskCreatorDetails.id,
      updatedByName: taskCreatorDetails.name,
      Priority: createTaskDto.Priority,
      status: createTaskDto.status,
      dueDate: createTaskDto.dueDate,
      isDeleted: false,
    });

    return await newTask.save();
  }

  async findAll(): Promise<Task[]> {
    return await this.taskModel
      .find({ isDeleted: false })
      .sort({ createdAt: 'asc' });
  }

  async findOne(id: string): Promise<Task> {
    return await this.taskModel.findById(id).where({ isDeleted: false });
  }

  async getPriorityTask(): Promise<Task[]> {
    const dates = getMondayAndFridayDates();
    return await this.taskModel
      .find({
        Priority: TaskPriority.High,
        isDeleted: false,
      })
      .select(
        '_id title description dueDate createdAt assignedToName status Priority',
      )
      .sort({ dueDate: 'asc' });
  }

  async getAssingedTask(id: string): Promise<Task[]> {
    return await this.taskModel
      .find({ assignedToId: id, isDeleted: false })
      .sort({ dueDate: 'asc' });
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    updatedById: string,
  ): Promise<Task> {
    const taskToUpdate = await this.taskModel.findById(id);

    if (!taskToUpdate) {
      throw new BadRequestException('Invalid Task ID.', {
        cause: new Error(),
        description: 'Invalid Task ID.',
      });
    }

    const taskAssigneeDetails = await this.userModel.findById(
      updateTaskDto.assignedToId,
    );

    if (!taskAssigneeDetails) {
      throw new BadRequestException('Invalid Task Assignee ID.', {
        cause: new Error(),
        description: 'Invalid Task Assignee ID.',
      });
    }

    const taskUpdater = await this.userModel.findById(updatedById);
    taskToUpdate.assignedToName = taskAssigneeDetails.name;
    taskToUpdate.assignedToId = taskAssigneeDetails.id;
    taskToUpdate.title = updateTaskDto.title;
    taskToUpdate.description = updateTaskDto.description;
    taskToUpdate.dueDate = updateTaskDto.dueDate;
    taskToUpdate.status = updateTaskDto.status;
    taskToUpdate.updatedById = taskUpdater.id;
    taskToUpdate.updatedByName = taskUpdater.name;
    taskToUpdate.Priority = updateTaskDto.Priority;
    return this.taskModel.findByIdAndUpdate(id, taskToUpdate, { new: true });
  }

  async remove(id: string, updaterId: string) {
    const taskToUpdate = await this.taskModel.findById(id);

    if (taskToUpdate.isDeleted === true) {
      throw new BadRequestException('Invalid Task ID.', {
        cause: new Error(),
        description: 'Invalid Task ID.',
      });
    }
    const taskUpdater = await this.userModel.findById(updaterId);
    taskToUpdate.isDeleted = true;
    taskToUpdate.updatedById = taskUpdater.id;
    taskToUpdate.updatedByName = taskUpdater.name;
    await this.taskModel.findByIdAndUpdate(id, taskToUpdate);
    return `Task ID:${taskToUpdate.id} has been deleted!`;
  }

  async summary() {
    const totalTasks = await this.taskModel.countDocuments();
    const completedTasks = await this.taskModel.countDocuments({
      status: TaskStatus.Completed,
    });
    const pendingTasks = await this.taskModel.countDocuments({
      status: TaskStatus.Pending,
    });
    const inProgressTasks = await this.taskModel.countDocuments({
      status: TaskStatus.InProgress,
    });

    return {
      completedTasks: completedTasks,
      inProgressTasks: inProgressTasks,
      pendingTasks: pendingTasks,
      totalsTasks: totalTasks,
    };
  }

  async summaryPriority() {
    const lowPrio = await this.taskModel.countDocuments({
      Priority: TaskPriority.Low,
    });
    const medPrio = await this.taskModel.countDocuments({
      Priority: TaskPriority.Medium,
    });
    const highPrio = await this.taskModel.countDocuments({
      Priority: TaskPriority.High,
    });

    const returnResult = [
      { priority: 'High Priority', count: highPrio },
      { priority: 'Medium Priority', count: medPrio },
      { priority: 'Low Priority', count: lowPrio },
    ];

    return returnResult;
  }
}
