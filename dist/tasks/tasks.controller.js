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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const reorder_task_dto_1 = require("./dto/reorder-task.dto");
const moveToList_task_dto_1 = require("./dto/moveToList-task.dto");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async create(response, listId, createTaskDto) {
        try {
            const task = await this.tasksService.create(createTaskDto, +listId);
            response.status(common_1.HttpStatus.CREATED).send(task);
        }
        catch (e) {
            response.status(common_1.HttpStatus.BAD_REQUEST).send(e.message);
        }
    }
    async reOrder(id, reorderTaskDto, response) {
        try {
            const { order } = reorderTaskDto;
            const task = await this.tasksService.reOrder(+id, order);
            response.status(common_1.HttpStatus.OK).send(task);
        }
        catch (e) {
            response.status(common_1.HttpStatus.BAD_REQUEST).send(e.message);
        }
    }
    async moveTask(id, moveTaskDto, response) {
        try {
            const { listId } = moveTaskDto;
            const task = await this.tasksService.moveToList(+id, +listId);
            response.status(common_1.HttpStatus.OK).send(task);
        }
        catch (e) {
            response.status(common_1.HttpStatus.BAD_REQUEST).send(e.message);
        }
    }
    async update(response, id, updateTaskDto) {
        try {
            const task = await this.tasksService.update(+id, updateTaskDto);
            response.status(common_1.HttpStatus.OK).send(task);
        }
        catch (e) {
            response.status(common_1.HttpStatus.BAD_REQUEST).send(e.message);
        }
    }
    async remove(response, id) {
        try {
            const task = await this.tasksService.remove(+id);
            response.status(common_1.HttpStatus.OK).send(task);
        }
        catch (e) {
            response.status(common_1.HttpStatus.BAD_REQUEST).send(e.message);
        }
    }
};
__decorate([
    (0, common_1.Post)(':listId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('listId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('reorder/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reorder_task_dto_1.ReorderTaskDto, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "reOrder", null);
__decorate([
    (0, common_1.Patch)('moveToList/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, moveToList_task_dto_1.MoveTaskDto, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "moveTask", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "remove", null);
TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map