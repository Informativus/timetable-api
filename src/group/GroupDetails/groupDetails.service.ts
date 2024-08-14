import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { GROUP_REPOSITORY } from 'src/config/constants/constants';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GroupDto } from 'src/dto/group/group.dto';
import { isDataNotEmpty } from 'src/utils/isDataNotEmpty.util';
import { IGroupRepository } from '../repository/groupRepository.interface';

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

  async getGroupWithPartId(partGroupId: string): Promise<GroupDto> {
    const group: GroupDto[] = await this.groupRe.getGroupWithPartId(
      `${partGroupId}%`,
    );

    if (!isDataNotEmpty(group[0])) {
      throw new BadRequestException('Group does not exist');
    }

    return group[0];
  }
}
