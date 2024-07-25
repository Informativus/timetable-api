import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GroupDto {
  @ApiProperty({ example: '1I-1-23' })
  @IsString()
  id: string; // In format '1I-1-23'
}
