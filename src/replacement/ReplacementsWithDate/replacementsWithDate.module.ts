import { Module } from '@nestjs/common';
import { ReplacementsRepository } from '../repositories/replacementsRepository.service';
import { ReplacementsRepositoryModule } from '../repositories/replacementsRepository.module';
import { GetReplacementsWithDate } from './getReplacementsWithDate.service';
import { GroupService } from 'src/group/group.service';
import { GroupModule } from 'src/group/group.module';
import { DatabaseModule } from 'src/database/database.module';
import { GroupRepository } from 'src/group/repository/groupRepository.service';
import { PostgresDatabaseService } from 'src/database/postgres-database/postgresDatabase.service';

Module({
  imports: [ReplacementsRepositoryModule, GroupModule, DatabaseModule],
  providers: [
    GetReplacementsWithDate,
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
  exports: [GetReplacementsWithDate],
});

export class ReplacementsWithDateModule {}
