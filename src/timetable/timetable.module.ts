import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { DatabaseModule } from '../database/database.module';
import { PostgresDatabaseService } from '../database/postgres-database/postgresDatabase.service';
import { GroupService } from '../group/group.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TimetableController],
  providers: [
    TimetableService,
    { provide: 'IRelationDatabase', useClass: PostgresDatabaseService },
    { provide: 'IGroup', useClass: GroupService },
  ],
  exports: [TimetableService],
})
export class TimetableModule {}
