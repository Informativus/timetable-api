import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SuccessStatusDto {
  @ApiProperty({ example: false })
  @IsBoolean()
  success: boolean;
}
