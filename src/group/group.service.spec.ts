import { Test, TestingModule } from '@nestjs/testing';
import { GroupService } from './group.service';
import { IRelationDatabase } from '../database/relationDatabase.interface';
import { GroupDto } from 'src/dto/group/group.dto';
import { BadRequestException } from '@nestjs/common';
import { InfoAllGroupDto } from '../dto/group/infoAllGroup.dto';
import { GetGroupDto } from '../dto/group/getGroup.dto';

describe('GroupService', () => {
  let service: GroupService;
  let mockRelationDatabase: Partial<IRelationDatabase>;

  beforeEach(async () => {
    mockRelationDatabase = {
      sendQuery: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        { provide: 'IRelationDatabase', useValue: mockRelationDatabase },
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
  });

  describe('getGroupWithId', () => {
    it('should return group with id from database', async () => {
      const mockGroup = [{ group_id: 1, text_id: '1I-1-23', title: '1I-1-23' }];
      const sentGroupTextId: string = '1I-1-23';
      mockRelationDatabase.sendQuery = jest.fn().mockResolvedValue(mockGroup);
      const result: GetGroupDto = await service.getGroupWithId({
        textId: sentGroupTextId,
      } as GroupDto);

      expect(result).toEqual(mockGroup[0]);
      expect(
        mockRelationDatabase.sendQuery({
          text: 'SELECT * FROM student_groups WHERE text_id = $1 LIMIT 1',
          values: [sentGroupTextId],
        }),
      );
    });

    it('should throw an error if group not found', async () => {
      mockRelationDatabase.sendQuery = jest.fn().mockResolvedValue([]);

      await expect(
        service.getGroupWithId({ textId: '1I-1-23' } as GroupDto),
      ).rejects.toThrow(BadRequestException);

      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'SELECT * FROM student_groups WHERE text_id = $1 LIMIT 1',
        values: ['1I-1-23'],
      });
    });
  });

  describe('getAllGroups', () => {
    it('should get all groups from database', async () => {
      const mockGroups = [
        {
          group_id: 1,
          text_id: '1I-1-23',
          title: '1И-1-23',
        },
        {
          group_id: 2,
          text_id: '1I-2-23',
          title: '1И-2-23',
        },
      ];

      const resultGroups: InfoAllGroupDto = {
        groups: mockGroups,
      };

      mockRelationDatabase.sendQuery = jest.fn().mockResolvedValue(mockGroups);
      const result: InfoAllGroupDto = await service.getAllGroups();

      expect(result).toEqual(resultGroups);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'SELECT text_id, title FROM student_groups',
      });
    });
  });

  describe('setGroup', () => {
    it('should set group in database', async () => {
      const mockGroup = [];
      const groupType: GetGroupDto = {
        text_id: '1I-3-23',
        title: '1И-3-23',
      };

      mockRelationDatabase.sendQuery = jest.fn().mockResolvedValue(mockGroup);
      await service.setGroup(groupType);

      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'INSERT INTO student_groups (text_id, title) VALUES ($1, $2)',
        values: [groupType.text_id, groupType.title],
      });
    });

    it('should throw an error if group already exists', async () => {
      const mockGroup = [{ group_id: 1, text_id: '1I-1-23', title: '1I-1-23' }];
      const sentGroupTextId: string = '1I-1-23';
      mockRelationDatabase.sendQuery = jest.fn().mockResolvedValue(mockGroup);

      await expect(
        service.setGroup({ text_id: '1I-1-23', title: '1I-1-23' }),
      ).rejects.toThrow(BadRequestException);

      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'SELECT group_id FROM student_groups WHERE text_id = $1 LIMIT 1',
        values: [sentGroupTextId],
      });
    });
  });
});
