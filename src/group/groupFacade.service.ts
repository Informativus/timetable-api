import { Injectable } from '@nestjs/common';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GroupDto } from 'src/dto/group/group.dto';
import { InfoAllGroupDto } from 'src/dto/group/infoAllGroup.dto';
import { GroupList } from './GroupList/groupList.service';
import { GroupDataValidator } from './GroupDataValidate/groupDataValidator.service';
import { GroupDetail } from './GroupDetail/groupDetail.service';
import { ICheckGroupOnExists } from './Interfaces/ICheckGroupOnExists.interface';
import { IGetGroupWithData } from './Interfaces/IGetGroupWithData.interface';
import { ISetGroupInStorage } from './Interfaces/ISetGroupInStorage.interface';
import { SetGroupInDbService } from './SetGroupData/setGroupInDb.service';

@Injectable()
export class GroupFacade
  implements IGetGroupWithData, ISetGroupInStorage, ICheckGroupOnExists
{
  constructor(
    private readonly setGroupInDb: SetGroupInDbService,
    private readonly getGroupWithData: GroupDetail,
    private readonly checkData: GroupDataValidator,
    private readonly getGroups: GroupList,
  ) {}

  async getGroupWithId(groupData: GroupDto): Promise<GetGroupDto> {
    return await this.getGroupWithData.getGroupWithId(groupData);
  }

  async getGroupsWithExistsTimetable(): Promise<InfoAllGroupDto> {
    return await this.getGroups.getGroupsWithExistsTimetable();
  }

  async getGroupWithPartId(partGroupId: string): Promise<GroupDto> {
    return await this.getGroupWithData.getGroupWithPartId(partGroupId);
  }

  async getAllGroups(): Promise<InfoAllGroupDto> {
    return await this.getGroups.getAllGroups();
  }

  async setGroup(groupDto: GetGroupDto): Promise<void> {
    return await this.setGroupInDb.setGroup(groupDto);
  }

  async isExistsGroup(groupData: GroupDto): Promise<boolean> {
    return await this.checkData.isExistsGroup(groupData);
  }
}
