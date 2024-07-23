import { GetGroupDto } from './getGroup.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InfoAllGroupDto {
  @IsNotEmpty()
  @ApiProperty({
    example: [{ group_id: 1, text_id: '1I-1-23', title: '1И-1-23' }],
  })
  groups: GetGroupDto[];
}
