import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GroupDto } from 'src/dto/group/group.dto';
import { IRelationDatabase } from 'src/database/relationDatabase.interface';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { IGroupRepository } from './groupRepository.interface';
import { validateAndMapDto } from 'src/validators/validateAndMapDto.validator';

export class GroupRepository implements IGroupRepository {
  constructor(
    @Inject('IRelationDatabase')
    private readonly relationDatabase: IRelationDatabase,
  ) {}

  async getGroupWithId(groupData: GroupDto): Promise<GetGroupDto[]> {
    const data = await this.relationDatabase.sendQuery({
      text: 'SELECT * FROM student_groups WHERE id = $1 LIMIT 1',
      values: [groupData.id],
    });

    return validateAndMapDto(data, GetGroupDto);
  }

  async getGroupsWithExistsTimetable(): Promise<GetGroupDto[]> {
    const data = await this.relationDatabase.sendQuery({
      text: 'SELECT id, title FROM student_groups sg JOIN timetables tb ON sg.group_id = tb.group_id',
    });

    return validateAndMapDto(data, GetGroupDto);
  }

  async getAllGroups(): Promise<GetGroupDto[]> {
    const data = await this.relationDatabase.sendQuery({
      text: 'SELECT id, title FROM student_groups',
    });

    return validateAndMapDto(data, GetGroupDto);
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
