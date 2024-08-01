import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { DatabaseModule } from '../database/database.module';
import { PostgresDatabaseService } from '../database/postgres-database/postgresDatabase.service';
import { TimetableRepository } from './repositories/timetableRepository.service';
import { GroupModule } from 'src/group/group.module';
import { GroupRepository } from '../group/repository/groupRepository.service';
import { GroupFacade } from 'src/group/groupFacade.service';
import {
  GET_GROUP_WITH_DATA,
  GROUP_REPOSITORY,
  RELATION_DATABASE,
} from 'src/config/constants';
import { GetGroups } from 'src/group/AllGroups/getGroups.service';
import { SetGroupInDbService } from 'src/group/SetGroupData/setGroupInDb.service';
import { GetGroupWithData } from 'src/group/GroupWithData/getGroupWithData.service';

@Module({
  imports: [DatabaseModule, GroupModule],
  controllers: [TimetableController],
  providers: [
    TimetableService,
    GetGroups,
    SetGroupInDbService,
    GetGroupWithData,
    { provide: RELATION_DATABASE, useClass: PostgresDatabaseService },
    { provide: GET_GROUP_WITH_DATA, useClass: GroupFacade },
    { provide: GROUP_REPOSITORY, useClass: GroupRepository },
    { provide: 'ITimetableRepository', useClass: TimetableRepository },
  ],
  exports: [TimetableService],
})
export class TimetableModule {}
