import { BadRequestException, Injectable } from '@nestjs/common';
import { ITimetable } from './timetable.interface';
import { timetableType } from './types/timetable.type';
import { IRelationDatabase } from 'src/database/relationDatabase.interface';
import { PostgresDatabaseService } from 'src/database/postgres-database/postgresDatabase.service';
import { TimetableDto } from 'src/dto/timetable.dto';
import { IGroup } from 'src/group/group.interface';
import { GroupService } from 'src/group/group.service';
import { groupType } from 'src/group/types/group.type';

@Injectable()
export class TimetableService implements ITimetable {
  private relationDatabase: IRelationDatabase;
  private groupService: IGroup;
  constructor() {
    this.relationDatabase = new PostgresDatabaseService();
    this.groupService = new GroupService();
  }

  async setTimetable(
    groupTextId: TimetableDto,
    timetable: timetableType,
  ): Promise<void> {
    const group: groupType = await this.groupService.getWithId({
      textId: groupTextId.groupId,
    });

    if (!group) {
      throw new BadRequestException('Group not found');
    }

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

  async getTimetable(groupId: TimetableDto): Promise<timetableType> {
    const timetable: timetableType = await this.relationDatabase.sendQuery({
      text: 'SELECT tb.timetable FROM timetables tb JOIN student_groups sg ON tb.group_id = sg.group_id where sg.text_id = $1',
      values: [groupId.groupId],
    });

    if (!timetable[0]) {
      throw new BadRequestException('Timetable not found');
    }
    return timetable[0];
  }
}
