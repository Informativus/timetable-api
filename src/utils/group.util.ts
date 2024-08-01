import { GroupDto } from 'src/dto/group/group.dto';
import { IGetGroupWithData } from 'src/group/Interfaces/IGetGroupWithData.interface';

export async function ensureGroupExists(
  groupService: IGetGroupWithData,
  groupDto: GroupDto,
): Promise<void> {
  await groupService.getGroupWithId(groupDto);
}
