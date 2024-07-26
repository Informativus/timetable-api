import { IsArray, IsBoolean, IsNotEmpty } from 'class-validator';
import { ReplacementDto } from './replacement.dto';
import { IsReplacementArray } from '../../validators/isReplacementArray.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReplacementDto {
  @ApiProperty({ example: false })
  @IsNotEmpty()
  @IsBoolean()
  success: boolean;

  @ApiProperty({
    example: [
      {
        index: '1',
        cancelled: false,
        teacher: 'Иванов|Иван',
        room: '101',
        title: 'Математика',
        class: '10А',
        teacher_original: 'Иванов|Иван',
      },
    ],
    type: [ReplacementDto],
  })
  @IsArray()
  @IsReplacementArray({
    message: 'Replacements must be an array of valid ReplacementDto objects',
  })
  replacements: ReplacementDto[];
}
