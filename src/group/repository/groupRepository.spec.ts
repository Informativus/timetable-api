import { Test, TestingModule } from '@nestjs/testing';
import { GroupRepository } from './groupRepository.service';
import { GroupDto } from 'src/dto/group/group.dto';
import { IRelationDatabase } from 'src/database/relationDatabase.interface';
import { GetGroupDto } from '../../dto/group/getGroup.dto';

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
    it('should get group info from database', async () => {
      const mockGroup: GetGroupDto[] = [
        { group_id: 1, id: '1I-1-23', title: '1И-1-23' },
      ];
      mockRelationDatabase.sendQuery = jest.fn().mockResolvedValue(mockGroup);

      const result = await service.getGroupWithId({
        id: '1I-1-23',
      } as GroupDto);
      expect(result).toEqual(mockGroup);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'SELECT * FROM student_groups WHERE id = $1 LIMIT 1',
        values: ['1I-1-23'],
      });
    });
  });

  describe('getAllGroups', () => {
    it('should get all groups from database', async () => {
      const mockGroups = [{ id: '1I-1-23', title: 'mock group' }];
      mockRelationDatabase.sendQuery = jest.fn().mockResolvedValue(mockGroups);

      const result = await service.getAllGroups();
      expect(result).toEqual(mockGroups);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'SELECT id, title FROM student_groups',
      });
    });
  });

  describe('setGroup', () => {
    it('should set group in database', async () => {
      const mockGroupDto: GetGroupDto = {
        id: '1I-1-23',
        title: 'mock group',
      };
      mockRelationDatabase.sendQuery = jest
        .fn()
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce(null);

      await service.setGroup(mockGroupDto);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledTimes(1);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'INSERT INTO student_groups (id, title) VALUES ($1, $2)',
        values: [mockGroupDto.id, mockGroupDto.title],
      });
    });
  });
});
