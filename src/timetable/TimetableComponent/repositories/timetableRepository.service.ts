import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CreateTimetableDto } from '../../../dto/timetable/CreateTimetable.dto';
import { ITimetableRepository } from './timetableRepository.interface';
import { IRelationDatabase } from '../../../database/relationDatabase.interface';
import { validateAndMapDto } from 'src/utils/validateAndMapDto.util';
import { TGroupId } from 'src/group/types/groupId.type';
import { RELATION_DATABASE } from 'src/config/constants/constants';

export class TimetableRepository implements ITimetableRepository {
  constructor(
    @Inject(RELATION_DATABASE)
    private readonly relationDatabase: IRelationDatabase,
  ) {}

  async getTimetableWithGroup(
    groupTextId: string,
  ): Promise<CreateTimetableDto[]> {
    try {
      const result = await this.relationDatabase.sendQuery({
        text: 'SELECT timetable FROM data_on_year where id = $1 order by date DESC LIMIT 1',
        values: [groupTextId],
      });

      const timetable = result.map(
        (data: { timetable: CreateTimetableDto }) => data.timetable,
      );

      return validateAndMapDto(timetable, CreateTimetableDto);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to get timetable');
    }
  }

  async setTimetable(
    groupId: TGroupId,
    timetable: CreateTimetableDto,
  ): Promise<void> {
    try {
      await this.relationDatabase.sendQuery({
        text: 'INSERT INTO timetables (group_id, timetable) VALUES ($1, $2)',
        values: [groupId.group_id, JSON.stringify(timetable)],
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to set timetable');
    }
  }
}
