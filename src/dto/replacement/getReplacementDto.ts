import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetReplacementDto {
  @ApiProperty({ example: '1I-1-23' })
  @IsString()
  group: string;

  @ApiPropertyOptional({ example: '20.07.2024', required: false })
  @IsOptional()
  @IsString()
  date?: string;
}
