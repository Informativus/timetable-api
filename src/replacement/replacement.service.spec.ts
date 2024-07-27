import { Test, TestingModule } from '@nestjs/testing';
import { IReplacementRepository } from './repositories/replacementRepository.interface';
import { IGroupService } from 'src/group/groupService.interface';
import { ReplacementService } from './replacement.service';
import { ReplacementRepository } from './repositories/replacementRepository.service';
import { GroupService } from 'src/group/group.service';
import { CacheService } from 'src/cash/cache.service';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GroupId } from 'src/group/types/groupId.type';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacementDto';

describe('ReplacementService', () => {
  let service: ReplacementService;
  let mockCacheService: Partial<CacheService<CreateReplacementDto>>;
  let mockReplacementRepository: Partial<IReplacementRepository>;
  let mockGroupService: Partial<IGroupService>;

  beforeEach(async () => {
    mockCacheService = {
      get: jest.fn(),
      set: jest.fn(),
    };
    mockReplacementRepository = {
      getReplacementWithGroup: jest.fn(),
      getReplacementWithDate: jest.fn(),
      setReplacement: jest.fn(),
    };
    mockGroupService = {
      getGroupWithId: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'IReplacementRepository',
          useClass: ReplacementRepository,
        },
        { provide: 'IGroup', useClass: GroupService },
      ],
    }).compile();

    service = module.get<ReplacementService>(ReplacementService);
  });

  describe('setReplacement', () => {
    it('should set replacement in database and cache', async () => {
      const mockGroup: GetGroupDto = {
        id: '1I-1-23',
        title: 'mock group',
      };

      const mockGroupId: GroupId = {
        group_id: 1,
      };

      const mockReplacementDto: GetReplacementDto = {
        group: '1I-1-23',
      };

      const mockReplacement: CreateReplacementDto = {
        success: false,
        replacements: [
          {
            index: 5,
            cancelled: false,
            teacher: 'Иванов|Иван',
            room: '101',
            title: 'Математика',
            class: '1I-1-23',
            teacher_original: 'Иванов|Иван',
          },
        ],
      };

      mockGroupService.getGroupWithId = jest.fn().mockResolvedValue(mockGroup);

      expect(mockGroupService.getGroupWithId).toHaveBeenCalledTimes(1);
      expect(mockGroupService.getGroupWithId).toHaveBeenCalledWith({
        id: mockReplacementDto.group,
      });
      expect(mockCacheService.set).toHaveBeenCalledTimes(1);
      expect(mockCacheService.set).toHaveBeenCalledWith(
        mockReplacementDto.group,
        mockReplacement,
      );
      expect(mockReplacementRepository.setReplacement).toHaveBeenCalledTimes(1);
      expect(mockReplacementRepository.setReplacement).toHaveBeenCalledWith(
        mockGroupId,
        mockReplacement,
      );
      expect(service.setReplacements).toHaveBeenCalledTimes(1);
      expect(service.setReplacements).toHaveBeenCalledWith({
        mockReplacementDto,
        mockReplacement,
      });
    });
  });
});
