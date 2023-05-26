import { TasksService } from './tasks.service';
import { FastifyReply } from 'fastify';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ReorderTaskDto } from './dto/reorder-task.dto';
import { MoveTaskDto } from './dto/moveToList-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(response: FastifyReply, listId: string, createTaskDto: CreateTaskDto): Promise<void>;
    reOrder(id: string, reorderTaskDto: ReorderTaskDto, response: FastifyReply): Promise<void>;
    moveTask(id: string, moveTaskDto: MoveTaskDto, response: FastifyReply): Promise<void>;
    update(response: FastifyReply, id: string, updateTaskDto: UpdateTaskDto): Promise<void>;
    remove(response: FastifyReply, id: string): Promise<void>;
}
