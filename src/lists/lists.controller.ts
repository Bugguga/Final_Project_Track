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
    const list = await this.listsService.create(createListDto);
    response.status(HttpStatus.OK).send(list);
  }

  @Get()
  findAll() {
    return this.listsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.listsService.findOne(+id);
  // }
  @Patch('reorder/:id')
  async reOrder(
    @Param('id') id: string,
    @Body() reorderListDto: ReorderListDto,
    @Res() response: FastifyReply,
  ) {
    const { order } = reorderListDto;
    await this.listsService.reorder(+id, order);
    response.status(HttpStatus.OK).send('successfully');
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listsService.update(+id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listsService.remove(+id);
  }
}
