import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReplacementDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  index: number;

  @ApiProperty({ example: false })
  @IsBoolean()
  cancelled: boolean;

  @ApiProperty({ example: 'Иванов|Иван' })
  @IsString()
  teacher: string;

  @ApiProperty({ example: '101' })
  @IsString()
  room: string;

  @ApiProperty({ example: 'Математика' })
  @IsString()
  title: string;

  @ApiProperty({ example: '10А' })
  @IsString()
  class: string;
}
