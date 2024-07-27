import { ApiProperty } from '@nestjs/swagger';
import { IsStringArrayArray } from '../../validators/isStringArrayArray.validator';
import { IsNumberArrayArray } from '../../validators/isNumberArrayArray.validator';

export class CreateTimetableDto {
  @ApiProperty({
    example: [
      ['', '', '', ''],
      ['Разговоры о важном', '105', 'Чернышева|А|М|', ''],
    ],
  })
  @IsStringArrayArray()
  lessons: string[][];

  @ApiProperty({
    example: [[1, 2, 3, 4, 0, 0]],
  })
  @IsNumberArrayArray()
  even: number[][];

  @ApiProperty({
    example: [[1, 16, 3, 4, 0, 0]],
  })
  @IsNumberArrayArray()
  odd: number[][];

  @ApiProperty({
    example: [['8', '10', '8', '55']],
  })
  @IsStringArrayArray()
  times: string[][];
}
