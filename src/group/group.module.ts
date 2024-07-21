import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { PostgresDatabaseService } from '../database/postgres-database/postgresDatabase.service';

@Module({
  providers: [
    GroupService,
    { provide: 'IRelationDatabase', useClass: PostgresDatabaseService },
  ],
  controllers: [GroupController],
})
export class GroupModule {}
