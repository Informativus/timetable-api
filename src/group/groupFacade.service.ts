import { Injectable } from '@nestjs/common';
import { SetGroupInDbService } from './SetGroupData/setGroupInDb.service';
import { GetGroups } from './AllGroups/getGroups.service';
import { GetGroupWithData } from './GroupWithData/getGroupWithData.service';
import { IGetGroupWithData } from './Interfaces/IGetGroupWithData.interface';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GroupDto } from 'src/dto/group/group.dto';
import { InfoAllGroupDto } from 'src/dto/group/infoAllGroup.dto';
import { ISetGroupInStorage } from './Interfaces/ISetGroupInStorage.interface';
import { CheckGroupData } from './CheckGroupData/checkGroupData.service';
import { ICheckGroupData } from './Interfaces/ICheckGroupData.interface';

@Injectable()
export class GroupFacade
  implements IGetGroupWithData, ISetGroupInStorage, ICheckGroupData
{
  constructor(
    private readonly setGroupInDb: SetGroupInDbService,
    private readonly getGroupWithData: GetGroupWithData,
    private readonly checkData: CheckGroupData,
    private readonly getGroups: GetGroups,
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
