import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { ICheckGroupData } from '../Interfaces/ICheckGroupData.interface';
import { isDataNotEmpty } from 'src/utils/isDataNotEmpty.util';
import { GroupDto } from 'src/dto/group/group.dto';
import { Inject } from '@nestjs/common';
import { IGroupRepository } from '../repository/groupRepository.interface';
import { GROUP_REPOSITORY } from 'src/config/constants/constants';

export class CheckGroupData implements ICheckGroupData {
  constructor(
    @Inject(GROUP_REPOSITORY) private readonly groupRe: IGroupRepository,
  ) {}
  async isExistsGroup(groupData: GroupDto): Promise<boolean> {
    const group: GetGroupDto[] = await this.groupRe.getGroupWithId(groupData);
    return isDataNotEmpty(group[0]);
  }
}
