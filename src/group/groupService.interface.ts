import { GroupDto } from 'src/dto/group/group.dto';
import { GetGroupDto } from '../dto/group/getGroup.dto';
import { InfoAllGroupDto } from '../dto/group/infoAllGroup.dto';

export interface IGroupService {
  getGroupWithId(groupData: GroupDto): Promise<GetGroupDto>;

  getAllGroups(): Promise<InfoAllGroupDto>;

  getGroupsWithExistsTimetable(): Promise<InfoAllGroupDto>;

  setGroup(groupType: GetGroupDto): Promise<void>;

  isExistsGroup(groupData: GroupDto): Promise<boolean>;
}
