import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ReplacementDto } from './replacement.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidArrayDto } from '../../validators/isValidArrayDto.validator';

export class CreateReplacementDto {
  @ApiProperty({ example: false })
  @IsNotEmpty()
  @IsBoolean()
  success: boolean;

  @ApiProperty({
    example: [
      {
        index: 1,
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
  @IsValidArrayDto(ReplacementDto, {
    message: 'Replacements must be an array of valid ReplacementDto objects',
  })
  replacements: ReplacementDto[];
}
