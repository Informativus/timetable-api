import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GroupDto } from 'src/dto/group/group.dto';
import { InfoAllGroupDto } from 'src/dto/group/infoAllGroup.dto';

export interface IGroupRepository {
  getGroupWithId(groupData: GroupDto): Promise<GetGroupDto[]>;
  getAllGroups(): Promise<InfoAllGroupDto[]>;
  setGroup(groupDto: GetGroupDto): Promise<void>;
}
