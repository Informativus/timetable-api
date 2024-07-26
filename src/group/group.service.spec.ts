import { Test, TestingModule } from '@nestjs/testing';
import { GroupService } from './group.service';
import { IGroupRepository } from './repository/groupRepository.interface';
import { GetGroupDto } from '../dto/group/getGroup.dto';
import { InfoAllGroupDto } from '../dto/group/infoAllGroup.dto';
import { GroupDto } from '../dto/group/group.dto';

describe('GroupService', () => {
  let service: GroupService;
  let mockGroupRepository: Partial<IGroupRepository>;

  beforeEach(async () => {
    mockGroupRepository = {
      getAllGroups: jest.fn(),
      getGroupWithId: jest.fn(),
      setGroup: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        { provide: 'IGroupRepository', useValue: mockGroupRepository },
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
  });

  describe('getAllGroups', () => {
    it('should get all groups from database', async () => {
      const mockGroup: GetGroupDto[] = [
        {
          group_id: 1,
          id: '1I-1-23',
          title: 'mock group',
        },
      ];
      const mockAllGroups: InfoAllGroupDto = {
        groups: mockGroup,
      };
      mockGroupRepository.getAllGroups = jest.fn().mockResolvedValue(mockGroup);

      const result = await service.getAllGroups();
      expect(result).toEqual(mockAllGroups);
    });
  });

  describe('getGroupWithId', () => {
    it('should be get group info from database', async () => {
      const mockGroups: GetGroupDto[] = [
        {
          group_id: 1,
          id: '1I-1-23',
          title: 'mock group',
        },
      ];

      mockGroupRepository.getGroupWithId = jest
        .fn()
        .mockResolvedValue(mockGroups);

      const mockGroup: GroupDto = {
        id: '1I-1-23',
      };
      const result: GetGroupDto = await service.getGroupWithId(mockGroup);
      expect(result).toEqual(mockGroups[0]);
      expect(mockGroupRepository.getGroupWithId).toHaveBeenCalledTimes(1);
      expect(mockGroupRepository.getGroupWithId).toHaveBeenCalledWith(
        mockGroup,
      );
    });
  });

  describe('setGroup', () => {
    it('should set group in database', async () => {
      const mockGroup: GetGroupDto = {
        id: '1I-1-23',
        title: 'mock group',
      };
      const mockGroupDto: GroupDto = {
        id: '1I-1-23',
      };

      service.isExistsGroup = jest.fn().mockReturnValue(false);
      mockGroupRepository.setGroup = jest.fn();

      await service.setGroup(mockGroup);
      expect(service.isExistsGroup).toHaveBeenCalledWith(mockGroupDto);
      expect(mockGroupRepository.setGroup).toHaveBeenCalledTimes(1);
      expect(mockGroupRepository.setGroup).toHaveBeenCalledWith(mockGroup);
    });

    it('should throw error "group already exists"', async () => {
      const mockGroup: GetGroupDto = {
        id: '1I-1-23',
        title: 'mock group',
      };
      const mockGroupDto: GroupDto = {
        id: '1I-1-23',
      };

      service.isExistsGroup = jest.fn().mockReturnValue(true);
      mockGroupRepository.setGroup = jest.fn();

      await expect(service.setGroup(mockGroup)).rejects.toThrow(
        'Group already exists',
      );

      expect(service.isExistsGroup).toHaveBeenCalledWith(mockGroupDto);
      expect(mockGroupRepository.setGroup).toHaveBeenCalledTimes(0);
    });
  });

  describe('isExistsGroup', () => {
    it('should be get info about the existence of the group', async () => {
      const mockGroups: GetGroupDto[] = [
        {
          group_id: 1,
          id: '1I-1-23',
          title: 'mock group',
        },
      ];

      mockGroupRepository.getGroupWithId = jest
        .fn()
        .mockResolvedValue(mockGroups);

      const mockGroup: GroupDto = {
        id: '1I-1-23',
      };
      const result: boolean = await service.isExistsGroup(mockGroup);
      expect(result).toEqual(true);
      expect(mockGroupRepository.getGroupWithId).toHaveBeenCalledTimes(1);
      expect(mockGroupRepository.getGroupWithId).toHaveBeenCalledWith(
        mockGroup,
      );
    });
  });
});
