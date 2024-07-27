import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { DatabaseModule } from '../database/database.module';
import { PostgresDatabaseService } from '../database/postgres-database/postgresDatabase.service';
import { TimetableRepository } from './repositories/timetableRepository.service';
import { GroupModule } from 'src/group/group.module';
import { GroupService } from '../group/group.service';
import { GroupRepository } from '../group/repository/groupRepository.service';

@Module({
  imports: [DatabaseModule, GroupModule],
  controllers: [TimetableController],
  providers: [
    TimetableService,
    { provide: 'IRelationDatabase', useClass: PostgresDatabaseService },
    { provide: 'IGroupService', useClass: GroupService },
    { provide: 'IGroupRepository', useClass: GroupRepository },
    { provide: 'ITimetableRepository', useClass: TimetableRepository },
  ],
  exports: [TimetableService],
})
export class TimetableModule {}
