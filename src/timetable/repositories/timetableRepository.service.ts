import { Inject } from '@nestjs/common';
import { CreateTimetableDto } from '../../dto/timetable/CreateTimetable.dto';
import { ITimetableRepository } from './timetableRepository.interface';
import { IRelationDatabase } from '../../database/relationDatabase.interface';

export class TimetableRepositoryService implements ITimetableRepository {
  constructor(
    @Inject('IRelationDatabase')
    private readonly relationDatabase: IRelationDatabase,
  ) {}
  async getTimetableWithGroupId(groupId: string): Promise<CreateTimetableDto> {
    throw new Error('Method not implemented.');
  }
}
