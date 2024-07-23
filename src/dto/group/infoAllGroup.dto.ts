import { GetGroupDto } from './getGroup.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsGroupArray } from 'src/validators/isGroupDtoArray.validator';

export class InfoAllGroupDto {
  @IsNotEmpty()
  @ApiProperty({
    example: [{ group_id: 1, text_id: '1I-1-23', title: '1И-1-23' }],
  })
  @IsGroupArray({ message: 'Must be an array of groups' })
  groups: GetGroupDto[];
}
