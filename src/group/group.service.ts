import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IGroup } from './group.interface';
import { GroupDto } from 'src/dto/group/group.dto';
import { GetGroupDto } from '../dto/group/getGroup.dto';
import { InfoAllGroupDto } from '../dto/group/infoAllGroup.dto';
import { IGroupRepository } from './repository/groupRepository.interface';

@Injectable()
export class GroupService implements IGroup {
  constructor(
    @Inject('IGroupRepository') private readonly groupRe: IGroupRepository,
  ) {}

  async getGroupWithId(groupData: GroupDto): Promise<GetGroupDto> {
    const group: GetGroupDto[] = await this.groupRe.getGroupWithId(groupData);

    if (!group[0]) {
      throw new Error('Group does not exist');
    }

    return group[0];
  }

  async getAllGroups(): Promise<InfoAllGroupDto> {
    const groups: GetGroupDto[] = await this.groupRe.getAllGroups();

    if (!groups[0]) {
      throw new InternalServerErrorException({
        message: 'Something went wrong',
      });
    }

    return {
      groups: groups,
    };
  }

  async setGroup(groupDto: GetGroupDto): Promise<void> {
    if (await this.isExistsGroup(groupDto)) {
      throw new BadRequestException({ message: 'Group already exists' });
    }

    await this.groupRe.setGroup(groupDto);
  }

  async isExistsGroup(groupData: GroupDto): Promise<boolean> {
    const group: GetGroupDto = await this.getGroupWithId(groupData);
    return group ? true : false;
  }
}
