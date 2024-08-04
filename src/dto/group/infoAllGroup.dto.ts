import { GetGroupDto } from './getGroup.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidArrayDto } from '../../validators/isValidArrayDto.validator';

export class InfoAllGroupDto {
  @IsNotEmpty()
  @ApiProperty({
    example: [{ id: '1I-1-23', title: '1И-1-23' }],
  })
  @IsValidArrayDto(GetGroupDto, { message: 'Must be an array of groups' })
  groups: GetGroupDto[];
}
