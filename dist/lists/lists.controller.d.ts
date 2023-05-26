import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { FastifyReply } from 'fastify';
import { ReorderListDto } from './dto/reorder-list.dto';
export declare class ListsController {
    private readonly listsService;
    constructor(listsService: ListsService);
    create(createListDto: CreateListDto, response: FastifyReply): Promise<void>;
    findAll(): Promise<import(".prisma/client").List[]>;
    reOrder(id: string, reorderListDto: ReorderListDto, response: FastifyReply): Promise<void>;
    update(id: string, updateListDto: UpdateListDto): Promise<import(".prisma/client").List>;
    remove(id: string): Promise<import(".prisma/client").List>;
}
