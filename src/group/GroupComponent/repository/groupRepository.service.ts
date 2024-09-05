import { Inject, InternalServerErrorException } from '@nestjs/common';
import { RELATION_DATABASE } from 'src/config/constants/constants';
import { IRelationDatabase } from 'src/database/relationDatabase.interface';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GroupDto } from 'src/dto/group/group.dto';
import { validateAndMapDto } from 'src/utils/validateAndMapDto.util';
import { IGroupRepository } from './groupRepository.interface';

export class GroupRepository implements IGroupRepository {
  constructor(
    @Inject(RELATION_DATABASE)
    private readonly relationDatabase: IRelationDatabase,
  ) {}

  async getGroupWithId(groupData: GroupDto): Promise<GetGroupDto[]> {
    const result = await this.relationDatabase.sendQuery({
      text: 'SELECT * FROM student_groups WHERE id = $1 LIMIT 1',
      values: [groupData.id],
    });

    return validateAndMapDto(result, GetGroupDto);
  }

  async getGroupsWithExistsTimetable(): Promise<GetGroupDto[]> {
    const result = await this.relationDatabase.sendQuery({
      text: 'SELECT id, title FROM student_groups sg JOIN timetables tb ON sg.group_id = tb.group_id',
    });

    return validateAndMapDto(result, GetGroupDto);
  }

  async getGroupWithPartId(partGroupId: string): Promise<GroupDto[]> {
    const result = await this.relationDatabase.sendQuery({
      text: 'SELECT id FROM student_groups WHERE id LIKE($1)',
      values: [partGroupId],
    });

    return validateAndMapDto(result, GroupDto);
  }

  async getAllGroups(): Promise<GetGroupDto[]> {
    const result = await this.relationDatabase.sendQuery({
      text: 'SELECT id, title FROM student_groups',
    });

    return validateAndMapDto(result, GetGroupDto);
  }

  async setGroup(groupDto: GetGroupDto): Promise<void> {
    try {
      await this.relationDatabase.sendQuery({
        text: 'INSERT INTO student_groups (id, title) VALUES ($1, $2)',
        values: [groupDto.id, groupDto.title],
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
