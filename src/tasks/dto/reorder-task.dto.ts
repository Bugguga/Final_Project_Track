import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ReorderTaskDto {
  @ApiProperty()
  @IsNumber()
  readonly order: number;
}
