import {
  Controller,
  Get,
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

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Res() response: FastifyReply,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      const task = this.tasksService.update(+id, updateTaskDto);
      response.status(HttpStatus.OK).send(task);
    } catch (e) {
      response.status(HttpStatus.BAD_REQUEST).send(e.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
