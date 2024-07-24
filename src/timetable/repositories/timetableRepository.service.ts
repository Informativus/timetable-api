import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CreateTimetableDto } from '../../dto/timetable/CreateTimetable.dto';
import { ITimetableRepository } from './timetableRepository.interface';
import { IRelationDatabase } from '../../database/relationDatabase.interface';

export class TimetableRepositoryService implements ITimetableRepository {
  constructor(
    @Inject('IRelationDatabase')
    private readonly relationDatabase: IRelationDatabase,
  ) {}

  async getTimetableWithGroup(
    groupTextId: string,
  ): Promise<CreateTimetableDto[]> {
    try {
      return await this.relationDatabase.sendQuery({
        text: 'SELECT timetable FROM timetables WHERE group_id = $1',
        values: [groupTextId],
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to get timetable');
    }
  }

  async setTimetable(
    groupTextId: string,
    timetable: CreateTimetableDto,
  ): Promise<void> {
    try {
      await this.relationDatabase.sendQuery({
        text: 'INSERT INTO timetables (group_id, timetable) VALUES ($1, $2)',
        values: [groupTextId, JSON.stringify(timetable)],
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to set timetable');
    }
  }
}