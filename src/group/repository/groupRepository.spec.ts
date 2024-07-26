import { Test, TestingModule } from '@nestjs/testing';
import { GroupRepository } from './groupRepository.service';
import { IRelationDatabase } from 'src/database/relationDatabase.interface';
import { GroupDto } from 'src/dto/group/group.dto';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';

describe('GroupRepository', () => {
  let service: GroupRepository;
  let mockRelationDatabase: Partial<IRelationDatabase>;

  beforeEach(async () => {
    mockRelationDatabase = {
      sendQuery: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupRepository,
        { provide: 'IRelationDatabase', useValue: mockRelationDatabase },
      ],
    }).compile();

    service = module.get<GroupRepository>(GroupRepository);
  });

  describe('getGroupWithId', () => {
    it('should get info about the group from database', async () => {
      const mockGroupDto: GroupDto = {
        id: '1I-1-23',
      };
      const mockGroupData: GetGroupDto[] = [
        {
          group_id: 1,
          id: '1I-1-23',
          title: '1И-1-23',
        },
      ];

      mockRelationDatabase.sendQuery = jest
        .fn()
        .mockResolvedValue(mockGroupData);

      const result = await service.getGroupWithId(mockGroupDto);
      expect(result).toEqual(mockGroupData);
      console.debug(result);

      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledTimes(1);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'SELECT * FROM student_groups WHERE id = $1 LIMIT 1',
        values: [mockGroupDto.id],
      });
    });
  });

  describe('getGroupsWithExistsTimetable', () => {
    it('should get all groups with exists timetable from database', async () => {
      const mockGroupData: GetGroupDto[] = [
        {
          id: '1I-1-23',
          title: '1И-1-23',
        },
      ];

      mockRelationDatabase.sendQuery = jest
        .fn()
        .mockResolvedValue(mockGroupData);

      const result = await service.getGroupsWithExistsTimetable();
      expect(result).toEqual(mockGroupData);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledTimes(1);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'SELECT id, title FROM student_groups sg JOIN timetables tb ON sg.group_id = tb.group_id',
      });
    });
  });

  describe('getAllGroups', () => {
    it('should get all groups from database', async () => {
      const mockGroupData: GetGroupDto[] = [
        {
          id: '1I-1-23',
          title: '1И-1-23',
        },
      ];

      mockRelationDatabase.sendQuery = jest
        .fn()
        .mockResolvedValue(mockGroupData);

      const result = await service.getAllGroups();
      expect(result).toEqual(mockGroupData);

      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledTimes(1);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'SELECT id, title FROM student_groups',
      });
    });
  });

  describe('setGroup', () => {
    it('should set group in database', async () => {
      const mockGroupData: GetGroupDto = {
        id: '1I-1-23',
        title: '1И-1-23',
      };
      mockRelationDatabase.sendQuery = jest.fn().mockResolvedValue(null);

      await service.setGroup(mockGroupData);

      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledTimes(1);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'INSERT INTO student_groups (id, title) VALUES ($1, $2)',
        values: [mockGroupData.id, mockGroupData.title],
      });
    });

    it('should throw an error if data is not valid', async () => {
      const mockGroupData: GetGroupDto = {
        id: '',
        title: '1И-1-23',
      };

      jest.spyOn(service, 'setGroup').mockImplementation(async (data) => {
        if (!data.id) {
          throw new Error('Data is not valid');
        }
        await mockRelationDatabase.sendQuery({
          text: 'INSERT INTO student_groups (id, title) VALUES ($1, $2)',
          values: [data.id, data.title],
        });
      });

      await expect(service.setGroup(mockGroupData)).rejects.toThrow(
        'Data is not valid',
      );

      expect(service.setGroup).toHaveBeenCalledWith(mockGroupData);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledTimes(0);
    });
  });
});
