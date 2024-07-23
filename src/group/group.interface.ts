import { GroupDto } from 'src/dto/group/group.dto';
import { GetGroupDto } from '../dto/group/getGroup.dto';
import { InfoAllGroupDto } from '../dto/group/infoAllGroup.dto';

export interface IGroup {
  getGroupWithId(groupData: GroupDto): Promise<GetGroupDto>;

  getAllGroups(): Promise<InfoAllGroupDto>;

  setGroup(groupType: GetGroupDto): Promise<void>;
}
