import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { PostgresDatabaseService } from '../database/postgres-database/postgresDatabase.service';
import { GroupRepository } from './repository/groupRepository.service';

@Module({
  providers: [
    GroupService,
    { provide: 'IGroupRepository', useClass: GroupRepository },
    { provide: 'IRelationDatabase', useClass: PostgresDatabaseService },
  ],
  controllers: [GroupController],
  exports: [GroupService],
})
export class GroupModule {}
