import { Injectable } from '@nestjs/common';
import { listenerCount } from 'process';
import { ListsService } from 'src/lists/lists.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private listService: ListsService,
  ) {}

  async create(createTaskDto: CreateTaskDto, listId: number) {
    const list = await this.prisma.list.findUnique({
      where: { id: listId },
      include: { tasks: true },
    });
    return await this.prisma.task.create({
      data: {
        ...createTaskDto,
        order: list.tasks.length,
        list: { connect: { id: listId } },
      },
    });
  }

  async reOrder(id: number, order: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    this.listService.reOrderTask(task.listId, task.order, order);
    return await this.prisma.task.update({
      where: { id },
      data: {
        order,
      },
    });
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async moveToList(id: number, listId: number) {
    return await this.prisma.task.update({
      where: { id },
      data: { list: { connect: { id: listId } } },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.prisma.task.update({
      where: { id },
      data: {
        ...updateTaskDto,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.task.delete({ where: { id } });
  }
}
