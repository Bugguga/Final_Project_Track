import { ListsService } from 'src/lists/lists.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private prisma;
    private listService;
    constructor(prisma: PrismaService, listService: ListsService);
    create(createTaskDto: CreateTaskDto, listId: number): Promise<import(".prisma/client").Task>;
    reOrder(id: number, order: number): Promise<import(".prisma/client").Task>;
    findAll(): string;
    findOne(id: number): string;
    moveToList(id: number, listId: number): Promise<import(".prisma/client").Task>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<import(".prisma/client").Task>;
    remove(id: number): Promise<import(".prisma/client").Task>;
}
