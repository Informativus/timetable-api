import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TimetableDto {
  @ApiProperty({ example: '1I-1-23' })
  @IsString()
  group: string;
}
