import { TasksService } from './tasks.service';
import { FastifyReply } from 'fastify';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(response: FastifyReply, listId: string, createTaskDto: CreateTaskDto): Promise<void>;
    findAll(): string;
    findOne(id: string): string;
    update(response: FastifyReply, id: string, updateTaskDto: UpdateTaskDto): void;
    remove(id: string): Promise<import(".prisma/client").Task>;
}
