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
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { FastifyReply } from 'fastify';
import { ReorderListDto } from './dto/reorder-list.dto';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  async create(
    @Body() createListDto: CreateListDto,
    @Res() response: FastifyReply,
  ) {
    try {
      const list = await this.listsService.create(createListDto);
      response.status(HttpStatus.OK).send(list);
    } catch (e) {
      response.status(HttpStatus.BAD_REQUEST).send(e.message);
    }
  }

  @Get()
  async findAll(@Res() response: FastifyReply) {
    try {
      const lists = await this.listsService.findAll();
      response.status(HttpStatus.OK).send(lists);
    } catch (e) {
      response.status(HttpStatus.BAD_REQUEST).send(e.message);
    }
  }

  @Patch('reorder/:id')
  async reOrder(
    @Param('id') id: string,
    @Body() reorderListDto: ReorderListDto,
    @Res() response: FastifyReply,
  ) {
    try {
      const { order } = reorderListDto;
      await this.listsService.reorder(+id, order);
      response.status(HttpStatus.OK).send('successfully');
    } catch (e) {
      response.status(HttpStatus.BAD_REQUEST).send(e.message);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateListDto: UpdateListDto,
    @Res() response: FastifyReply,
  ) {
    try {
      const list = this.listsService.update(+id, updateListDto);
      response.status(HttpStatus.OK).send(list);
    } catch (e) {
      response.status(HttpStatus.BAD_REQUEST).send(e.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() response: FastifyReply) {
    try {
      const list = this.listsService.remove(+id);
      response.status(HttpStatus.OK).send(list);
    } catch (e) {
      response.status(HttpStatus.BAD_REQUEST).send(e.message);
    }
  }
}
