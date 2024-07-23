import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IGroup } from './group.interface';
import { GroupDto } from 'src/dto/group/group.dto';
import { IRelationDatabase } from 'src/database/relationDatabase.interface';
import { GetGroupDto } from '../dto/group/getGroup.dto';
import { InfoAllGroupDto } from '../dto/group/infoAllGroup.dto';

@Injectable()
export class GroupService implements IGroup {
  constructor(
    @Inject('IRelationDatabase')
    private readonly relationDatabase: IRelationDatabase,
  ) {}

  async getGroupWithId(groupData: GroupDto): Promise<GetGroupDto> {
    const group: GetGroupDto = await this.relationDatabase.sendQuery({
      text: 'SELECT * FROM student_groups WHERE id = $1 LIMIT 1',
      values: [groupData.id],
    });

    if (!group[0]) {
      throw new BadRequestException({ message: 'Group does not exist' });
    }
    return group[0];
  }

  async getAllGroups(): Promise<InfoAllGroupDto> {
    const groups: GetGroupDto[] = await this.relationDatabase.sendQuery({
      text: 'SELECT id, title FROM student_groups',
    });

    return {
      groups: groups,
    };
  }

  async setGroup(groupType: GetGroupDto): Promise<void> {
    const existingGroup = await this.relationDatabase.sendQuery({
      text: 'SELECT group_id FROM student_groups WHERE id = $1 LIMIT 1',
      values: [groupType.id],
    });

    if (existingGroup[0]) {
      throw new BadRequestException({ message: 'Group already exists' });
    }

    await this.relationDatabase.sendQuery({
      text: 'INSERT INTO student_groups (id, title) VALUES ($1, $2)',
      values: [groupType.id, groupType.title],
    });
  }
}
