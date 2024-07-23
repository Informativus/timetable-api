import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReplacementsEmptyDto {
  @ApiProperty({ example: false })
  @IsBoolean()
  success: boolean;
}
