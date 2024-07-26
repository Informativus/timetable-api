import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ITimetable } from './timetable.interface';
import { CreateTimetableDto } from '../dto/timetable/CreateTimetable.dto';
import { ITimetableRepository } from './repositories/timetableRepository.interface';
import { GroupDto } from 'src/dto/group/group.dto';
import { IGroupService } from 'src/group/groupService.interface';

@Injectable()
export class TimetableService implements ITimetable {
  constructor(
    @Inject('IGroupService')
    private readonly groupService: IGroupService,
    @Inject('ITimetableRepository')
    private readonly timetableRepository: ITimetableRepository,
  ) {}

  async setTimetable(
    groupDto: GroupDto,
    timetable: CreateTimetableDto,
  ): Promise<void> {
    if (!(await this.groupService.isExistsGroup(groupDto))) {
      throw new BadRequestException('Group not found');
    }

    await this.timetableRepository.setTimetable(groupDto.id, timetable);
  }

  async getTimetable(groupDto: GroupDto): Promise<CreateTimetableDto> {
    const timetable: CreateTimetableDto[] =
      await this.timetableRepository.getTimetableWithGroup(groupDto.id);
    if (!timetable[0]) {
      throw new BadRequestException('Timetable not found');
    }
    return timetable[0];
  }
}
