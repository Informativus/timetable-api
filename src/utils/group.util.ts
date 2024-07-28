import { GroupDto } from 'src/dto/group/group.dto';
import { IGroupService } from 'src/group/groupService.interface';

export async function ensureGroupExists(
  groupService: IGroupService,
  groupDto: GroupDto,
): Promise<void> {
  await groupService.getGroupWithId(groupDto);
}
