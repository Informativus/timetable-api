import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IGroupRepository } from '../repository/groupRepository.interface';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GroupDto } from 'src/dto/group/group.dto';
import { isDataNotEmpty } from 'src/utils/isDataNotEmpty.util';
import { GROUP_REPOSITORY } from 'src/config/constants';

@Injectable()
export class GetGroupWithData {
  constructor(
    @Inject(GROUP_REPOSITORY) private readonly groupRe: IGroupRepository,
  ) {}

  async getGroupWithId(groupData: GroupDto): Promise<GetGroupDto> {
    const group: GetGroupDto[] = await this.groupRe.getGroupWithId(groupData);

    if (!isDataNotEmpty(group[0])) {
      throw new BadRequestException('Group does not exist');
    }

    return group[0];
  }
}
