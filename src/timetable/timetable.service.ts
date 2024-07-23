import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ITimetable } from './timetable.interface';
import { CreateTimetableDto } from '../dto/timetable/CreateTimetable.dto';
import { IRelationDatabase } from 'src/database/relationDatabase.interface';
import { TimetableDto } from 'src/dto/timetable/timetable.dto';
import { IGroup } from 'src/group/group.interface';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { ITimetableRepository } from './repositories/timetableRepository.interface';

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
    groupDto: TimetableDto,
    timetable: CreateTimetableDto,
  ): Promise<void> {
    const group: GetGroupDto = await this.groupService.getGroupWithId({
      id: groupDto.group,
    });

    const existingTimetable: CreateTimetableDto =
      await this.timetableRepository.getTimetableWithGroupId(group.group_id);

    if (existingTimetable[0]) {
      throw new Error('Timetable already exists');
    }

    await this.timetableRepository.setTimetable(group.group_id, timetable);
  }

  async getTimetable(groupDto: TimetableDto): Promise<CreateTimetableDto> {
    const timetable: CreateTimetableDto = await this.relationDatabase.sendQuery(
      {
        text: 'SELECT tb.timetable FROM timetables tb JOIN student_groups sg ON tb.group_id = sg.group_id where sg.id = $1',
        values: [groupDto.group],
      },
    );
    if (!timetable[0]) {
      throw new BadRequestException('Timetable not found');
    }
    return timetable[0];
  }
}
