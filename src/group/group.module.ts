import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GetGroups } from './GroupList/groupList.service';
import { GetGroupWithData } from './GroupDetails/groupDetails.service';
import { GroupDataStorageService } from './GroupDataStorage/groupDataStorage.service';
import { GroupFacade } from './groupFacade.service';
import { DatabaseModule } from 'src/database/database.module';
import {
  checkGroupData,
  getGroupWithData,
  relationDatabase,
} from 'src/config/constants/provideConstants';
import { groupRepository, setGroupInStorage } from './localConstants';
import { CheckGroupData } from './GroupDataValidator/groupDataValidator.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    GroupFacade,
    GetGroupWithData,
    GetGroups,
    GroupDataStorageService,
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
