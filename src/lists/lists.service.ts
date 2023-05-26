import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Injectable()
export class ListsService {
  constructor(private prisma: PrismaService) {}
  async create(createListDto: CreateListDto) {
    const lists = await this.findAll();
    const list = await this.prisma.list.create({
      data: { ...createListDto, order: lists.length },
    });
    return list;
  }

  async findAll() {
    const lists = await this.prisma.list.findMany();
    return lists;
  }

  findOne(id: number) {
    return `This action returns a #${id} list`;
  }

  async update(id: number, updateListDto: UpdateListDto) {
    const list = await this.prisma.list.update({
      where: { id },
      data: { ...updateListDto },
    });
    return list;
  }

  async reOrderTask(id: number, oldOrder: number, order: number) {
    const list = await this.prisma.list.findUnique({
      where: { id: id },
      include: { tasks: true },
    });
    list.tasks.forEach(async (task) => {
      if (task.order >= order && task.order < oldOrder) {
        await this.prisma.task.update({
          where: { id: task.id },
          data: {
            order: task.order + 1,
          },
        });
      }
    });
  }

  async reorder(id: number, order: number) {
    const selectedList = await this.prisma.list.findUnique({
      where: { id },
    });
    const oldOrder = selectedList.order;
    const list = await this.prisma.list.update({
      where: { id },
      data: { order },
    });
    console.log(order);
    const lists = await this.findAll();
    lists.forEach(async (l) => {
      if (l.order >= list.order && l.order < oldOrder && l.id != list.id) {
        await this.prisma.list.update({
          where: { id: l.id },
          data: {
            order: l.order + 1,
          },
        });
      }
    });
  }

  async remove(id: number) {
    const list = await this.prisma.list.delete({ where: { id } });
    const lists = await this.findAll();
    lists.forEach(async (l) => {
      if (l.order > list.order) {
        await this.prisma.list.update({
          where: { id: l.id },
          data: {
            order: l.order - 1,
          },
        });
      }
    });
    return list;
  }
}
