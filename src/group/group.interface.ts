import { GroupDto } from 'src/dto/group.dto';
import { groupType } from './types/group.type';
import { infoAllGroupType } from './types/infoAllGroup.type';

export interface IGroup {
  getWithId(groupData: GroupDto): Promise<groupType>;
  getAllGroups(): Promise<infoAllGroupType>;
}
