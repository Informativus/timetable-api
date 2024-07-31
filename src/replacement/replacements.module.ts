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
import { GroupService } from 'src/group/group.service';

@Module({
  imports: [GroupModule, CacheModule, DatabaseModule],
  controllers: [ReplacementsController],
  providers: [
    ReplacementsFacade,
    GetReplacementsWithGroup,
    GetReplacementsWithDate,
    SetReplacements,
    ReplacementsRepository,
    { provide: 'IRelationDatabase', useClass: PostgresDatabaseService },
    { provide: 'IReplacementRepository', useClass: ReplacementsRepository },
    { provide: 'IGetReplaceWithDate', useClass: ReplacementsRepository },
    { provide: 'IGetReplaceWithGroup', useClass: ReplacementsRepository },
    { provide: 'ISerReplaceInStorage', useClass: ReplacementsRepository },
    { provide: 'INoRelationDatabase', useClass: RedisDatabaseService },
    { provide: 'IGroupService', useClass: GroupService },
    { provide: 'IGroupRepository', useClass: GroupRepository },
    CacheService,
  ],
  exports: [ReplacementsFacade],
})
export class ReplacementsModule {}
