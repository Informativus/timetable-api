import { Module } from '@nestjs/common';
import { ReplacementsController } from './replacements.controller';
import { ReplacementsFacade } from './replacementsFacade.service';
import { ReplacementsWithGroupModule } from './ReplacementsWithGroup/replacementsWithGroup.module';
import { ReplacementsWithDateModule } from './ReplacementsWithDate/replacementsWithDate.module';
import { SetReplacementsModule } from './SetReplacements/setReplacements.module';
import { SetReplacements } from './SetReplacements/setReplacementsInDb.service';
import { GetReplacementsWithGroup } from './ReplacementsWithGroup/getReplacementsWithGroup.service';
import { GetReplacementsWithDate } from './ReplacementsWithDate/getReplacementsWithDate.service';
import { ReplacementsRepositoryModule } from './repositories/replacementsRepository.module';
import { ReplacementsRepository } from './repositories/replacementsRepository.service';
import { GroupModule } from 'src/group/group.module';
import { GroupRepository } from 'src/group/repository/groupRepository.service';
import { GroupService } from 'src/group/group.service';
import { CacheService } from 'src/cache/cache.service';
import { CacheModule } from 'src/cache/cache.module';
import { DatabaseModule } from 'src/database/database.module';
import { PostgresDatabaseService } from 'src/database/postgres-database/postgresDatabase.service';
import { RedisDatabaseService } from 'src/database/redis-database/redis-database.service';

@Module({
  imports: [
    ReplacementsWithGroupModule,
    ReplacementsWithDateModule,
    SetReplacementsModule,
    ReplacementsRepositoryModule,
    GroupModule,
    CacheModule,
    DatabaseModule,
  ],
  controllers: [ReplacementsController],
  providers: [
    ReplacementsFacade,
    GetReplacementsWithGroup,
    GetReplacementsWithDate,
    SetReplacements,
    ReplacementsRepository,
    { provide: 'IRelationDatabase', useClass: PostgresDatabaseService },
    { provide: 'INoRelationDatabase', useClass: RedisDatabaseService },
    { provide: 'IGroupService', useClass: GroupService },
    { provide: 'IGroupRepository', useClass: GroupRepository },
    CacheService,
  ],
  exports: [ReplacementsFacade],
})
export class ReplacementsModule {}
