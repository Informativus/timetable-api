import { Inject } from '@nestjs/common';
import { timetableType } from '../types/timetable.type';
import { ITimetableRepository } from './timetableRepository.interface';
import { IRelationDatabase } from '../../database/relationDatabase.interface';

export class TimetableRepositoryService implements ITimetableRepository {
  constructor(
    @Inject('IRelationDatabase')
    private readonly relationDatabase: IRelationDatabase,
  ) {}
  async getTimetableWithGroupId(groupId: string): Promise<timetableType> {
    throw new Error('Method not implemented.');
  }
}
