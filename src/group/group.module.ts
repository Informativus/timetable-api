import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { PostgresDatabaseService } from '../database/postgres-database/postgresDatabase.service';
import { GroupRepository } from './repository/groupRepository.service';
import { GetGroups } from './AllGroups/getGroups.service';
import { GetGroupWithData } from './GroupWithData/getGroupWithData.service';
import { SetGroupInDbService } from './SetGroupData/setGroupInDb.service';
import { GroupFacade } from './groupFacade.service';
import { DatabaseModule } from 'src/database/database.module';
import {
  RELATION_DATABASE,
  GROUP_REPOSITORY,
  GET_GROUP_WITH_DATA,
  GET_ALL_GROUPS,
  SET_GROUP_IN_STORAGE,
} from 'src/config/constants';

@Module({
  imports: [DatabaseModule],
  providers: [
    GroupFacade,
    GetGroupWithData,
    GetGroups,
    SetGroupInDbService,
    { provide: RELATION_DATABASE, useClass: PostgresDatabaseService },
    { provide: GROUP_REPOSITORY, useClass: GroupRepository },
    { provide: GET_GROUP_WITH_DATA, useClass: GroupFacade },
    { provide: GET_ALL_GROUPS, useClass: GroupFacade },
    { provide: SET_GROUP_IN_STORAGE, useClass: GroupFacade },
  ],
  controllers: [GroupController],
  exports: [GroupFacade],
})
export class GroupModule {}
