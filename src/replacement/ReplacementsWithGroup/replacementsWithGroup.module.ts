import { Module } from '@nestjs/common';
import { GetReplacementsWithGroup } from './getReplacementsWithGroup.service';
import { ReplacementsRepositoryModule } from '../repositories/replacementsRepository.module';
import { ReplacementsRepository } from '../repositories/replacementsRepository.service';
import { GroupService } from 'src/group/group.service';
import { GroupModule } from 'src/group/group.module';
import { CacheModule } from 'src/cache/cache.module';
import { PostgresDatabaseService } from 'src/database/postgres-database/postgresDatabase.service';
import { DatabaseModule } from 'src/database/database.module';
import { GroupRepository } from 'src/group/repository/groupRepository.service';

@Module({
  imports: [
    ReplacementsRepositoryModule,
    GroupModule,
    CacheModule,
    DatabaseModule,
  ],
  providers: [
    GetReplacementsWithGroup,
    {
      provide: 'IGroupRepository',
      useClass: GroupRepository,
    },
    {
      provide: 'IRelationDatabase',
      useClass: PostgresDatabaseService,
    },
    {
      provide: 'IReplacementRepository',
      useClass: ReplacementsRepository,
    },
    {
      provide: 'IGroupService',
      useClass: GroupService,
    },
  ],
  exports: [GetReplacementsWithGroup],
})
export class ReplacementsWithGroupModule {}
