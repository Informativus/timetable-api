import { Module } from '@nestjs/common';
import { ReplacementService } from './replacement.service';
import { ReplacementController } from './replacement.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ReplacementRepositoryService } from './repositories/replacementRepository.service';
import { PostgresDatabaseService } from 'src/database/postgres-database/postgresDatabase.service';
import { CacheModule } from 'src/cash/cache.module';
import { GroupService } from '../group/group.service';
import { GroupRepository } from '../group/repository/groupRepository.service';
import { CacheService } from '../cash/cache.service';
import { RedisDatabaseService } from 'src/database/redis-database/redis-database.service';

@Module({
  imports: [DatabaseModule, CacheModule],
  controllers: [ReplacementController],
  providers: [
    ReplacementService,
    ReplacementRepositoryService,
    CacheService,
    {
      provide: 'INoRelationDatabase',
      useClass: RedisDatabaseService,
    },
    {
      provide: 'IReplacementRepository',
      useClass: ReplacementRepositoryService,
    },
    { provide: 'IRelationDatabase', useClass: PostgresDatabaseService },
    { provide: 'IGroupService', useClass: GroupService },
    { provide: 'IGroupRepository', useClass: GroupRepository },
  ],
  exports: [ReplacementService],
})
export class ReplacementModule {}
