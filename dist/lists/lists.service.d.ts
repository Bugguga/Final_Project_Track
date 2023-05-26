import { PrismaService } from 'src/prisma/prisma.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
export declare class ListsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createListDto: CreateListDto): Promise<import(".prisma/client").List>;
    findAll(): Promise<import(".prisma/client").List[]>;
    findOne(id: number): string;
    update(id: number, updateListDto: UpdateListDto): Promise<import(".prisma/client").List>;
    reOrderTask(id: number, oldOrder: number, order: number): Promise<void>;
    reorder(id: number, order: number): Promise<void>;
    remove(id: number): Promise<import(".prisma/client").List>;
}
