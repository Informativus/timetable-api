import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ITimetable } from './timetable.interface';
import { CreateTimetableDto } from '../dto/timetable/CreateTimetable.dto';
import { IRelationDatabase } from 'src/database/relationDatabase.interface';
import { ITimetableRepository } from './repositories/timetableRepository.interface';
import { GroupDto } from 'src/dto/group/group.dto';
import { IGroup } from 'src/group/group.interface';

@Injectable()
export class TimetableService implements ITimetable {
  constructor(
    @Inject('IRelationDatabase')
    private readonly relationDatabase: IRelationDatabase,
    @Inject('IGroup')
    private readonly groupService: IGroup,
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
    const timetable: CreateTimetableDto = await this.relationDatabase.sendQuery(
      {
        text: 'SELECT tb.timetable FROM timetables tb JOIN student_groups sg ON tb.group_id = sg.group_id where sg.id = $1',
        values: [groupDto.id],
      },
    );
    if (!timetable[0]) {
      throw new BadRequestException('Timetable not found');
    }
    return timetable[0];
  }
}