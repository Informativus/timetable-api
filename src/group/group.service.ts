import { BadRequestException, Injectable } from '@nestjs/common';
import { IGroup } from './group.interface';
import { GroupDto } from 'src/dto/group.dto';
import { IRelationDatabase } from 'src/database/relationDatabase.interface';
import { PostgresDatabaseService } from 'src/database/postgres-database/postgresDatabase.service';
import { groupType } from './types/group.type';
import { infoAllGroupType } from './types/infoAllGroup.type';

@Injectable()
export class GroupService implements IGroup {
  private relationDatabase: IRelationDatabase;
  constructor() {
    this.relationDatabase = new PostgresDatabaseService();
  }
  async getWithId(groupData: GroupDto): Promise<groupType> {
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
      values: [],
    });

    const allInfoGroup: infoAllGroupType = {
      groups: groups,
    };

    return allInfoGroup;
  }
}
