import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ITimetable } from './timetable.interface';
import { timetableType } from './types/timetable.type';
import { IRelationDatabase } from 'src/database/relationDatabase.interface';
import { TimetableDto } from 'src/dto/timetable.dto';
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
    timetable: timetableType,
  ): Promise<void> {
    const group: GetGroupDto = await this.groupService.getGroupWithId({
      textId: groupDto.groupTextId,
    });
    const existingTimetable: timetableType =
      await this.relationDatabase.sendQuery({
        text: 'SELECT timetable FROM timetables WHERE groupId = $1',
        values: [group.group_id],
      });
    if (existingTimetable[0]) {
      throw new Error('Timetable already exists');
    }
    console.debug('Timetable set');

    await this.relationDatabase.sendQuery({
      text: 'INSERT INTO timetables (group_id, timetable) VALUES ($1, $2)',
      values: [group.group_id, JSON.stringify(timetable)],
    });
  }

  async getTimetable(groupDto: TimetableDto): Promise<timetableType> {
    const timetable: timetableType = await this.relationDatabase.sendQuery({
      text: 'SELECT tb.timetable FROM timetables tb JOIN student_groups sg ON tb.group_id = sg.group_id where sg.text_id = $1',
      values: [groupDto.groupTextId],
    });
    if (!timetable[0]) {
      throw new BadRequestException('Timetable not found');
    }
    return timetable[0];
  }
}
