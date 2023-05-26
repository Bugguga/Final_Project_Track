"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const lists_service_1 = require("../lists/lists.service");
const prisma_service_1 = require("../prisma/prisma.service");
let TasksService = class TasksService {
    constructor(prisma, listService) {
        this.prisma = prisma;
        this.listService = listService;
    }
    async create(createTaskDto, listId) {
        const list = await this.prisma.list.findUnique({
            where: { id: listId },
            include: { tasks: true },
        });
        return await this.prisma.task.create({
            data: Object.assign(Object.assign({}, createTaskDto), { order: list.tasks.length, list: { connect: { id: listId } } }),
        });
    }
    async reOrder(id, order) {
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
    findOne(id) {
        return `This action returns a #${id} task`;
    }
    async moveToList(id, listId) {
        return await this.prisma.task.update({
            where: { id },
            data: { list: { connect: { id: listId } } },
        });
    }
    async update(id, updateTaskDto) {
        return await this.prisma.task.update({
            where: { id },
            data: Object.assign({}, updateTaskDto),
        });
    }
    async remove(id) {
        return await this.prisma.task.delete({ where: { id } });
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        lists_service_1.ListsService])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map