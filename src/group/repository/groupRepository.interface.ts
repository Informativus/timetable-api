import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GroupDto } from 'src/dto/group/group.dto';

export interface IGroupRepository {
  getGroupWithId(groupData: GroupDto): Promise<GetGroupDto[]>;

  getGroupsWithExistsTimetable(): Promise<GetGroupDto[]>;

  getAllGroups(): Promise<GetGroupDto[]>;

  setGroup(groupDto: GetGroupDto): Promise<void>;
}
