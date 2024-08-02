import { Module } from '@nestjs/common';
import { TimetableController } from './timetable.controller';
import { DatabaseModule } from '../database/database.module';
import { TimetableRepository } from './repositories/timetableRepository.service';
import { GroupModule } from 'src/group/group.module';
import { TIMETABLE_REPOSITORY } from 'src/config/constants';
import { GetTimetableWithData } from './timetableData/getTimetableWithData.service';
import { TimetableFacade } from './timetableFacade.service';
import { SetTimetableInDb } from './timetableStorage/setTimetableInDb.service';
import { getGroupWithData, relationDatabase } from '../config/provideConstants';

@Module({
  imports: [DatabaseModule, GroupModule],
  controllers: [TimetableController],
  providers: [
    TimetableFacade,
    GetTimetableWithData,
    SetTimetableInDb,
    relationDatabase,
    getGroupWithData,
    { provide: TIMETABLE_REPOSITORY, useClass: TimetableRepository },
  ],
  exports: [TimetableFacade],
})
export class TimetableModule {}
