import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GroupDto } from 'src/dto/group/group.dto';
import { InfoAllGroupDto } from 'src/dto/group/infoAllGroup.dto';

export interface IGroupService {
  getGroupWithId(groupData: GroupDto): Promise<GetGroupDto>;
  getAllGroups(): Promise<InfoAllGroupDto>;
  getGroupsWithExistsTimetable(): Promise<InfoAllGroupDto>;
  setGroup(groupType: GetGroupDto): Promise<void>;
  isExistsGroup(groupData: GroupDto): Promise<boolean>;
}
