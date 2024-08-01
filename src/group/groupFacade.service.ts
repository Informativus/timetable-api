import { Injectable } from '@nestjs/common';
import { SetGroupInDbService } from './SetGroupData/setGroupInDb.service';
import { GetGroups } from './AllGroups/getGroups.service';
import { GetGroupWithData } from './GroupWithData/getGroupWithData.service';
import { IGetGroupWithData } from './Interfaces/IGetGroupWithData.interface';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GroupDto } from 'src/dto/group/group.dto';
import { IGetAllGroups } from './Interfaces/IGetAllGroup.interface';
import { InfoAllGroupDto } from 'src/dto/group/infoAllGroup.dto';
import { ISetGroupInStorage } from './Interfaces/ISetGroupInStorage.interface';

@Injectable()
export class GroupFacade
  implements IGetGroupWithData, IGetAllGroups, ISetGroupInStorage
{
  constructor(
    private readonly setGroupInDb: SetGroupInDbService,
    private readonly getGroupWithData: GetGroupWithData,
    private readonly getGroups: GetGroups,
  ) {}

  async getGroupWithId(groupData: GroupDto): Promise<GetGroupDto> {
    return await this.getGroupWithData.getGroupWithId(groupData);
  }

  async getGroupsWithExistsTimetable(): Promise<InfoAllGroupDto> {
    return await this.getGroups.getGroupsWithExistsTimetable();
  }

  async getAllGroups(): Promise<InfoAllGroupDto> {
    return await this.getGroups.getAllGroups();
  }

  async setGroup(groupDto: GetGroupDto): Promise<void> {
    return await this.setGroupInDb.setGroup(groupDto);
  }
}
