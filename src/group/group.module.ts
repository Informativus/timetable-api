import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GetGroups } from './AllGroups/getGroups.service';
import { GetGroupWithData } from './GroupWithData/getGroupWithData.service';
import { SetGroupInDbService } from './SetGroupData/setGroupInDb.service';
import { GroupFacade } from './groupFacade.service';
import { DatabaseModule } from 'src/database/database.module';
import { relationDatabase } from 'src/config/constants';
import {
  getGroupWithData,
  groupRepository,
  setGroupInStorage,
} from './localConstants';

@Module({
  imports: [DatabaseModule],
  providers: [
    GroupFacade,
    GetGroupWithData,
    GetGroups,
    SetGroupInDbService,
    relationDatabase,
    groupRepository,
    getGroupWithData,
    setGroupInStorage,
  ],
  controllers: [GroupController],
  exports: [GroupFacade],
})
export class GroupModule {}
