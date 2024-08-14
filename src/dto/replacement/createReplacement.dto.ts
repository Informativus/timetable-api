import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { IsValidArrayDto } from '../../validators/isValidArrayDto.validator';
import { ReplacementDto } from './replacement.dto';

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
      },
    ],
    type: [ReplacementDto],
  })
  @IsValidArrayDto(ReplacementDto, {
    message: 'Replacements must be an array of valid ReplacementDto objects',
  })
  replacements: ReplacementDto[];
}
