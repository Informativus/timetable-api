import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IGroupService } from './groupService.interface';
import { GroupDto } from 'src/dto/group/group.dto';
import { GetGroupDto } from '../dto/group/getGroup.dto';
import { InfoAllGroupDto } from '../dto/group/infoAllGroup.dto';
import { IGroupRepository } from './repository/groupRepository.interface';
import { ValidateAndMapDto } from 'src/validators/validateAndMapDtoDecorator.validator';

@Injectable()
export class GroupService implements IGroupService {
  constructor(
    @Inject('IGroupRepository') private readonly groupRe: IGroupRepository,
  ) {}

  async getGroupWithId(groupData: GroupDto): Promise<GetGroupDto> {
    const group: GetGroupDto[] = await this.groupRe.getGroupWithId(groupData);

    if (!group[0]) {
      throw new BadRequestException('Group does not exist');
    }

    return group[0];
  }

  async getGroupsWithExistsTimetable(): Promise<InfoAllGroupDto> {
    const groups: GetGroupDto[] =
      await this.groupRe.getGroupsWithExistsTimetable();
    if (!groups[0]) {
      throw new InternalServerErrorException({
        message: 'Something went wrong',
      });
    }

    return {
      groups: groups,
    };
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

  @ValidateAndMapDto(GetGroupDto)
  async setGroup(groupDto: GetGroupDto): Promise<void> {
    if (await this.isExistsGroup({ id: groupDto.id })) {
      throw new BadRequestException({ message: 'Group already exists' });
    }

    await this.groupRe.setGroup(groupDto);
  }

  async isExistsGroup(groupData: GroupDto): Promise<boolean> {
    console.debug(groupData);
    const group: GetGroupDto = await this.getGroupWithId(groupData);
    return group ? true : false;
  }
}
