import { IsValidArrayDto } from 'src/validators/isValidArrayDto.validator';
import { GroupArray } from './groupArray.dto';

export class GroupsData {
  @IsValidArrayDto(GroupArray)
  group: GroupArray[];
}
