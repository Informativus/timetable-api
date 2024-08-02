import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IGroupRepository } from '../repository/groupRepository.interface';
import { ValidateAndMapDto } from 'src/validators/validateAndMapDtoDecorator.validator';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GroupDto } from 'src/dto/group/group.dto';
import { isDataNotEmpty } from 'src/utils/isDataNotEmpty.util';
import { GROUP_REPOSITORY } from 'src/config/constants/constants';

@Injectable()
export class SetGroupInDbService {
  constructor(
    @Inject(GROUP_REPOSITORY) private readonly groupRe: IGroupRepository,
  ) {}

  @ValidateAndMapDto(GetGroupDto)
  async setGroup(groupDto: GetGroupDto): Promise<void> {
    if (await this.isExistsGroup(groupDto)) {
      throw new BadRequestException({ message: 'Group already exists' });
    }

    await this.groupRe.setGroup(groupDto);
  }

  async isExistsGroup(groupData: GroupDto): Promise<boolean> {
    const group: GetGroupDto[] = await this.groupRe.getGroupWithId(groupData);
    return isDataNotEmpty(group[0]);
  }
}
