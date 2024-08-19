import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
  UseGuards,
  Request,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    console.log('WE HITTING CREATE FROM CONTROLLER');
    return await this.taskService.create(createTaskDto, req.payload.sub);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('summary')
  summary() {
    return this.taskService.summary();
  }

  @UseGuards(AuthGuard)
  @Get('prioritysummary')
  prioritysummary() {
    return this.taskService.summaryPriority();
  }

  @UseGuards(AuthGuard)
  @Get('assingedtask')
  assingedtask(@Request() req) {
    return this.taskService.getAssingedTask(req.payload.sub);
  }

  @UseGuards(AuthGuard)
  @Get('highprioritytasks')
  highprioritytasks() {
    return this.taskService.getPriorityTask();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ) {
    try {
      return await this.taskService.update(id, updateTaskDto, req.payload.sub);
    } catch (err) {
      console.log({ err });
      console.log(err.kind);
      if (err != undefined && err.kind == 'ObjectId') {
        throw new BadRequestException(
          `ID ${err.stringValue.toString()} is invalid`,
          {
            cause: new Error(),
            description: 'Invalid Request',
          },
        );
      }
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    if (req.payload.role !== 'Admin')
      throw new UnauthorizedException(
        'Only Admins are allowed to delete task',
        {
          cause: new Error(),
          description: 'Invalid Request',
        },
      );

    return this.taskService.remove(id, req.payload.sub);
  }
}
