import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetGroupDto {
  @IsOptional()
  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  group_id?: number;
  @ApiProperty({ example: '1I-1-23' })
  @IsString()
  text_id: string;
  @ApiProperty({ example: '1И-1-23' })
  @IsString()
  title: string;
}
