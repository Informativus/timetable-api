import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { DatabaseModule } from '../database/database.module';
import { PostgresDatabaseService } from '../database/postgres-database/postgresDatabase.service';
import { TimetableRepositoryService } from './repositories/timetableRepository.service';
import { GroupModule } from 'src/group/group.module';

@Module({
  imports: [DatabaseModule, GroupModule],
  controllers: [TimetableController],
  providers: [
    TimetableService,
    { provide: 'IRelationDatabase', useClass: PostgresDatabaseService },
    { provide: 'IGroup', useClass: GroupModule },
    { provide: 'ITimetableRepository', useClass: TimetableRepositoryService },
  ],
  exports: [TimetableService],
})
export class TimetableModule {}
