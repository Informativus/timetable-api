import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GetGroups } from './AllGroups/getGroups.service';
import { GetGroupWithData } from './GroupWithData/getGroupWithData.service';
import { SetGroupInDbService } from './SetGroupData/setGroupInDb.service';
import { GroupFacade } from './groupFacade.service';
import { DatabaseModule } from 'src/database/database.module';
import {
  checkGroupData,
  getGroupWithData,
  relationDatabase,
} from 'src/config/constants/provideConstants';
import { groupRepository, setGroupInStorage } from './localConstants';
import { CheckGroupData } from './CheckGroupData/checkGroupData.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    GroupFacade,
    GetGroupWithData,
    GetGroups,
    SetGroupInDbService,
    CheckGroupData,
    relationDatabase,
    groupRepository,
    getGroupWithData,
    setGroupInStorage,
    checkGroupData,
  ],
  controllers: [GroupController],
  exports: [GroupFacade],
})
export class GroupModule {}
