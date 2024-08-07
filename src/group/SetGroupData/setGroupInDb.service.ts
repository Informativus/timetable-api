import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IGroupRepository } from '../repository/groupRepository.interface';
import { ValidateAndMapDto } from 'src/validators/validateAndMapHttpDecorator.validator';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GROUP_REPOSITORY } from 'src/config/constants/constants';
import { CheckGroupData } from '../CheckGroupData/checkGroupData.service';

@Injectable()
export class SetGroupInDbService {
  constructor(
    @Inject(GROUP_REPOSITORY) private readonly groupRe: IGroupRepository,
    private readonly checkGroupData: CheckGroupData,
  ) {}

  @ValidateAndMapDto(GetGroupDto)
  async setGroup(groupDto: GetGroupDto): Promise<void> {
    if (await this.checkGroupData.isExistsGroup(groupDto)) {
      throw new BadRequestException({ message: 'Group already exists' });
    }

    await this.groupRe.setGroup(groupDto);
  }
}
