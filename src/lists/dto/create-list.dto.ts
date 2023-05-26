import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateListDto {
  @ApiProperty()
  @IsString()
  readonly title: string;
}
