import { Inject } from '@nestjs/common';
import { GROUP_REPOSITORY } from 'src/config/constants/constants';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GroupDto } from 'src/dto/group/group.dto';
import { isDataNotEmpty } from 'src/utils/isDataNotEmpty.util';
import { ICheckGroupOnExists } from '../../Interfaces/ICheckGroupOnExists.interface';
import { IGroupRepository } from '../repository/groupRepository.interface';

export class GroupDataValidator implements ICheckGroupOnExists {
  constructor(
    @Inject(GROUP_REPOSITORY) private readonly groupRe: IGroupRepository,
  ) {}
  async isExistsGroup(groupData: GroupDto): Promise<boolean> {
    const group: GetGroupDto[] = await this.groupRe.getGroupWithId(groupData);
    return isDataNotEmpty(group[0]);
  }
}
