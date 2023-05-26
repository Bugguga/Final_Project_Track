import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { FastifyReply } from 'fastify';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ReorderTaskDto } from './dto/reorder-task.dto';
import { MoveTaskDto } from './dto/moveToList-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':listId')
  async create(
    @Res() response: FastifyReply,
    @Param('listId') listId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    try {
      const task = await this.tasksService.create(createTaskDto, +listId);
      response.status(HttpStatus.CREATED).send(task);
    } catch (e) {
      response.status(HttpStatus.BAD_REQUEST).send(e.message);
    }
  }

  @Patch('reorder/:id')
  async reOrder(
    @Param('id') id: string,
    @Body() reorderTaskDto: ReorderTaskDto,
    @Res() response: FastifyReply,
  ) {
    try {
      const { order } = reorderTaskDto;
      const task = await this.tasksService.reOrder(+id, order);
      response.status(HttpStatus.OK).send(task);
    } catch (e) {
      response.status(HttpStatus.BAD_REQUEST).send(e.message);
    }
  }

  @Patch('moveToList/:id')
  async moveTask(
    @Param('id') id: string,
    @Body() moveTaskDto: MoveTaskDto,
    @Res() response: FastifyReply,
  ) {
    try {
      const { listId } = moveTaskDto;
      const task = await this.tasksService.moveToList(+id, +listId);
      response.status(HttpStatus.OK).send(task);
    } catch (e) {
      response.status(HttpStatus.BAD_REQUEST).send(e.message);
    }
  }

  @Patch(':id')
  async update(
    @Res() response: FastifyReply,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      const task = await this.tasksService.update(+id, updateTaskDto);
      response.status(HttpStatus.OK).send(task);
    } catch (e) {
      response.status(HttpStatus.BAD_REQUEST).send(e.message);
    }
  }

  @Delete(':id')
  async remove(@Res() response: FastifyReply, @Param('id') id: string) {
    try {
      const task = await this.tasksService.remove(+id);
      response.status(HttpStatus.OK).send(task);
    } catch (e) {
      response.status(HttpStatus.BAD_REQUEST).send(e.message);
    }
  }
}
