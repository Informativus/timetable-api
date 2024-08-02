import { Inject } from '@nestjs/common';
import {
  GET_GROUP_WITH_DATA,
  TIMETABLE_REPOSITORY,
} from 'src/config/constants/constants';
import { ITimetableRepository } from '../repositories/timetableRepository.interface';
import { ValidateAndMapDto } from 'src/validators/validateAndMapDtoDecorator.validator';
import { GroupDto } from 'src/dto/group/group.dto';
import { CreateTimetableDto } from 'src/dto/timetable/CreateTimetable.dto';
import { GroupId } from 'src/group/types/groupId.type';
import { IGetGroupWithData } from 'src/group/Interfaces/IGetGroupWithData.interface';

export class SetTimetableInDb {
  constructor(
    @Inject(TIMETABLE_REPOSITORY)
    private readonly timetableRepository: ITimetableRepository,
    @Inject(GET_GROUP_WITH_DATA)
    private readonly groupService: IGetGroupWithData,
  ) {}

  @ValidateAndMapDto(GroupDto, CreateTimetableDto)
  async setTimetable(
    groupDto: GroupDto,
    timetable: CreateTimetableDto,
  ): Promise<void> {
    const groupId: GroupId = <GroupId>(
      await this.groupService.getGroupWithId(groupDto)
    );

    await this.timetableRepository.setTimetable(groupId, timetable);
  }
}
