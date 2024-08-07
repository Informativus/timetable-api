import { GroupDto } from 'src/dto/group/group.dto';

export interface ICheckGroupData {
  isExistsGroup(groupData: GroupDto): Promise<boolean>;
}
