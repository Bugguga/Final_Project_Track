import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ReorderListDto {
  @ApiProperty()
  @IsNumber()
  readonly order: number;
}
