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
exports.ListsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ListsService = class ListsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createListDto) {
        const lists = await this.findAll();
        const list = await this.prisma.list.create({
            data: Object.assign(Object.assign({}, createListDto), { order: lists.length }),
        });
        return list;
    }
    async findAll() {
        const lists = await this.prisma.list.findMany({ include: { tasks: true } });
        return lists;
    }
    findOne(id) {
        return `This action returns a #${id} list`;
    }
    async update(id, updateListDto) {
        const list = await this.prisma.list.update({
            where: { id },
            data: Object.assign({}, updateListDto),
        });
        return list;
    }
    async reOrderTask(id, oldOrder, order) {
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
    async reorder(id, order) {
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
    async remove(id) {
        await this.prisma.task.deleteMany({
            where: {
                listId: id,
            },
        });
        const list = await this.prisma.list.delete({
            where: { id },
            include: {
                tasks: true,
            },
        });
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
};
ListsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ListsService);
exports.ListsService = ListsService;
//# sourceMappingURL=lists.service.js.map