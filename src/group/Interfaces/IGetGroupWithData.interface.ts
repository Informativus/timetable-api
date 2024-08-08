import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GroupDto } from 'src/dto/group/group.dto';

export interface IGetGroupWithData {
  getGroupWithId(groupData: GroupDto): Promise<GetGroupDto>;
  getGroupWithPartId(partGroupId: string): Promise<GroupDto>;
}
