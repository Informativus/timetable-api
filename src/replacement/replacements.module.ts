import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PostgresDatabaseService } from 'src/database/postgres-database/postgresDatabase.service';
import { RedisDatabaseService } from 'src/database/redis-database/redis-database.service';
import { CacheService } from 'src/cache/cache.service';
import { CacheModule } from 'src/cache/cache.module';
import { ReplacementsController } from './replacements.controller';
import { ReplacementsFacade } from './replacementsFacade.service';
import { SetReplacements } from './SetReplacements/setReplacementsInDb.service';
import { GetReplacementsWithGroup } from './ReplacementsWithGroup/getReplacementsWithGroup.service';
import { GetReplacementsWithDate } from './ReplacementsWithDate/getReplacementsWithDate.service';
import { ReplacementsRepository } from './repositories/replacementsRepository.service';
import { GroupModule } from 'src/group/group.module';
import { GroupRepository } from 'src/group/repository/groupRepository.service';
import { GroupFacade } from 'src/group/groupFacade.service';
import {
  GET_GROUP_WITH_DATA,
  GET_REPLACEMENTS_WITH_DATE,
  GET_REPLACEMENTS_WITH_GROUP,
  GROUP_REPOSITORY,
  NO_RELATION_DATABASE,
  RELATION_DATABASE,
  REPLACEMENTS_REPOSITORY,
  SET_REPLACEMENTS_IN_STORAGE,
} from 'src/config/constants';
import { GetGroupWithData } from 'src/group/GroupWithData/getGroupWithData.service';
import { SetGroupInDbService } from 'src/group/SetGroupData/setGroupInDb.service';
import { GetGroups } from 'src/group/AllGroups/getGroups.service';

@Module({
  imports: [GroupModule, CacheModule, DatabaseModule],
  controllers: [ReplacementsController],
  providers: [
    ReplacementsFacade,
    GetReplacementsWithGroup,
    GetReplacementsWithDate,
    SetReplacements,
    GetGroups,
    SetGroupInDbService,
    GetGroupWithData,
    { provide: RELATION_DATABASE, useClass: PostgresDatabaseService },
    { provide: REPLACEMENTS_REPOSITORY, useClass: ReplacementsRepository },
    { provide: GET_REPLACEMENTS_WITH_GROUP, useClass: ReplacementsRepository },
    { provide: GET_REPLACEMENTS_WITH_DATE, useClass: ReplacementsRepository },
    { provide: SET_REPLACEMENTS_IN_STORAGE, useClass: ReplacementsRepository },
    { provide: NO_RELATION_DATABASE, useClass: RedisDatabaseService },
    { provide: GET_GROUP_WITH_DATA, useClass: GroupFacade },
    { provide: GROUP_REPOSITORY, useClass: GroupRepository },
    CacheService,
  ],
  exports: [ReplacementsFacade],
})
export class ReplacementsModule {}
