import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IGroup } from './group.interface';
import { GroupDto } from 'src/dto/group.dto';
import { IRelationDatabase } from 'src/database/relationDatabase.interface';
import { groupType } from './types/group.type';
import { infoAllGroupType } from './types/infoAllGroup.type';

@Injectable()
export class GroupService implements IGroup {
  constructor(
    @Inject('IRelationDatabase')
    private readonly relationDatabase: IRelationDatabase,
  ) {}

  async getGroupWithId(groupData: GroupDto): Promise<groupType> {
    const group: groupType = await this.relationDatabase.sendQuery({
      text: 'SELECT * FROM student_groups WHERE text_id = $1 LIMIT 1',
      values: [groupData.textId],
    });

    if (!group[0]) {
      throw new BadRequestException({ message: 'Group does not exist' });
    }
    return group[0];
  }

  async getAllGroups(): Promise<infoAllGroupType> {
    const groups: groupType[] = await this.relationDatabase.sendQuery({
      text: 'SELECT text_id, title FROM student_groups',
    });

    return {
      groups: groups,
    };
  }

  async setGroup(groupType: groupType): Promise<void> {
    const existingGroup = await this.relationDatabase.sendQuery({
      text: 'SELECT group_id FROM student_groups WHERE text_id = $1 LIMIT 1',
      values: [groupType.text_id],
    });

    if (existingGroup[0]) {
      throw new BadRequestException({ message: 'Group already exists' });
    }

    await this.relationDatabase.sendQuery({
      text: 'INSERT INTO student_groups (text_id, title) VALUES ($1, $2)',
      values: [groupType.text_id, groupType.title],
    });
  }
}
