import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class MoveTaskDto {
  @ApiProperty()
  @IsNumber()
  readonly listId: number;
}
