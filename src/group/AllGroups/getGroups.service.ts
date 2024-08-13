import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { GROUP_REPOSITORY } from 'src/config/constants/constants';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { InfoAllGroupDto } from 'src/dto/group/infoAllGroup.dto';
import { isDataNotEmpty } from 'src/utils/isDataNotEmpty.util';
import { IGroupRepository } from '../repository/groupRepository.interface';

@Injectable()
export class GetGroups {
  constructor(
    @Inject(GROUP_REPOSITORY) private readonly groupRe: IGroupRepository,
  ) {}
  async getGroupsWithExistsTimetable(): Promise<InfoAllGroupDto> {
    const groups: GetGroupDto[] =
      await this.groupRe.getGroupsWithExistsTimetable();

    if (!isDataNotEmpty(groups[0])) {
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

    if (!isDataNotEmpty(groups[0])) {
      throw new InternalServerErrorException({
        message: 'Something went wrong',
      });
    }

    return {
      groups: groups,
    };
  }
}
