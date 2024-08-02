import { Test, TestingModule } from '@nestjs/testing';
import { SetGroupInDbService } from './setGroupInDb.service';
import { IGroupRepository } from '../repository/groupRepository.interface';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GroupDto } from 'src/dto/group/group.dto';

describe('SetGroupInDbService', () => {
  let service: SetGroupInDbService;
  let mockGroupRepository: Partial<IGroupRepository>;

  beforeEach(async () => {
    mockGroupRepository = {
      setGroup: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SetGroupInDbService,
        { provide: 'IGroupRepository', useValue: mockGroupRepository },
      ],
    }).compile();

    service = module.get<SetGroupInDbService>(SetGroupInDbService);
  });

  describe('setGroup', () => {
    it('should set group in database', async () => {
      const mockGroup: GetGroupDto = {
        id: '1I-1-23',
        title: 'mock group',
      };

      service.isExistsGroup = jest.fn().mockReturnValue(false);
      mockGroupRepository.setGroup = jest.fn();

      await service.setGroup(mockGroup);
      expect(service.isExistsGroup).toHaveBeenCalledWith(mockGroup);

      expect(mockGroupRepository.setGroup).toHaveBeenCalledTimes(1);
      expect(mockGroupRepository.setGroup).toHaveBeenCalledWith(mockGroup);
    });

    it('should throw error group already exists"', async () => {
      const mockGroup: GetGroupDto = {
        id: '1I-1-23',
        title: 'mock group',
      };

      service.isExistsGroup = jest.fn().mockReturnValue(true);
      mockGroupRepository.setGroup = jest.fn();

      await expect(service.setGroup(mockGroup)).rejects.toThrow(
        'Group already exists',
      );

      expect(service.isExistsGroup).toHaveBeenCalledWith(mockGroup);
      expect(mockGroupRepository.setGroup).toHaveBeenCalledTimes(0);
    });
  });

  describe('isExistsGroup', () => {
    it('should be get info about the existence of the group', async () => {
      jest.spyOn(service, 'isExistsGroup');
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

      expect(service.isExistsGroup).toHaveBeenCalledWith(mockGroup);
      expect(service.isExistsGroup).toHaveBeenCalledTimes(1);

      expect(mockGroupRepository.getGroupWithId).toHaveBeenCalledTimes(1);
      expect(mockGroupRepository.getGroupWithId).toHaveBeenCalledWith(
        mockGroup,
      );
    });
  });
});
