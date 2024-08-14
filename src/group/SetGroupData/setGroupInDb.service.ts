import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { GROUP_REPOSITORY } from 'src/config/constants/constants';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { ValidateAndMapDto } from 'src/validators/validateAndMapHttpDecorator.validator';
import { CheckGroupData } from '../CheckGroupData/checkGroupData.service';
import { IGroupRepository } from '../repository/groupRepository.interface';

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
