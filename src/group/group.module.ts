import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupList } from './GroupList/groupList.service';
import { GroupDetail } from './GroupDetail/groupDetail.service';
import { SetGroupInDbService } from './SetGroupData/setGroupInDb.service';
import { GroupFacade } from './groupFacade.service';
import { DatabaseModule } from 'src/database/database.module';
import {
  getGroupWithData,
  relationDatabase,
} from 'src/config/constants/provideConstants';
import {
  checkGroupData,
  groupRepository,
  setGroupInStorage,
} from './localConstants';
import { GroupDataValidator } from './GroupDataValidate/groupDataValidator.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    GroupFacade,
    GroupDetail,
    GroupList,
    SetGroupInDbService,
    GroupDataValidator,
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
