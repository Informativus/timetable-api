import { Test, TestingModule } from '@nestjs/testing';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GroupDataValidator } from '../GroupDataValidate/groupDataValidator.service';
import { IGroupRepository } from '../repository/groupRepository.interface';
import { SetGroupInDbService } from './setGroupInDb.service';

describe('SetGroupInDbService', () => {
  let service: SetGroupInDbService;
  let mockGroupRepository: Partial<IGroupRepository>;
  let mockCheckGroupData: Partial<GroupDataValidator>;

  beforeEach(async () => {
    mockGroupRepository = {
      setGroup: jest.fn(),
    };
    mockCheckGroupData = {
      isExistsGroup: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SetGroupInDbService,
        GroupDataValidator,
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

      mockGroupRepository.setGroup = jest.fn();
      mockCheckGroupData.isExistsGroup = jest.fn().mockResolvedValue(false);

      await service.setGroup(mockGroup);

      expect(mockCheckGroupData.isExistsGroup).toHaveBeenCalledTimes(1);
      expect(mockCheckGroupData.isExistsGroup).toHaveBeenCalledWith({
        id: '1I-1-23',
      });

      expect(mockGroupRepository.setGroup).toHaveBeenCalledTimes(1);
      expect(mockGroupRepository.setGroup).toHaveBeenCalledWith(mockGroup);
    });

    it('should throw error group already exists"', async () => {
      const mockGroup: GetGroupDto = {
        id: '1I-1-23',
        title: 'mock group',
      };

      mockGroupRepository.setGroup = jest.fn();

      await expect(service.setGroup(mockGroup)).rejects.toThrow(
        'Group already exists',
      );

      expect(mockGroupRepository.setGroup).toHaveBeenCalledTimes(0);
    });
  });
});
