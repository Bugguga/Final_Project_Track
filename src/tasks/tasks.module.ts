import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ListsModule } from 'src/lists/lists.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [PrismaModule, ListsModule],
})
export class TasksModule {}
