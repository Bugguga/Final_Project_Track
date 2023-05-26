import { Injectable } from '@nestjs/common';
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
    const { dueDate } = createTaskDto;
    const [day, month, year] = dueDate.split('-');
    const dueDate_ = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day) + 1,
    );
    const list = await this.prisma.list.findUnique({
      where: { id: listId },
      include: { tasks: true },
    });
    return await this.prisma.task.create({
      data: {
        ...createTaskDto,
        dueDate: dueDate_,
        order: list.tasks.length,
        list: { connect: { id: listId } },
      },
    });
  }

  async reOrder(id: number, order: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    await this.listService.reOrderTask(task.listId, task.order, order);
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
    const { dueDate } = updateTaskDto;
    let dueDate_ = null;
    if (dueDate) {
      const [day, month, year] = dueDate.split('-');
      dueDate_ = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day) + 1,
      );
    }
    return await this.prisma.task.update({
      where: { id },
      data: {
        ...updateTaskDto,
        dueDate: dueDate_,
      },
    });
  }

  async remove(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    const list = await this.prisma.list.findUnique({
      where: { id: task.listId },
      include: { tasks: true },
    });
    list.tasks.forEach(async (t) => {
      if (t.order > task.order) {
        await this.prisma.task.update({
          where: { id: t.id },
          data: {
            order: t.order - 1,
          },
        });
      }
    });
    return await this.prisma.task.delete({ where: { id } });
  }
}
