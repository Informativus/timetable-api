import { CacheService } from 'src/cache/cache.service';
import { ReplacementPersistenceLayer } from './replacementPersistenceLayer.service';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { ISetReplaceInStorage } from '../ReplacementsRepository/Interfaces/ISetReplaceInStorage.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';
import { TGroupId } from 'src/group/types/groupId.type';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { IGetGroupWithData } from '../../../group/Interfaces/IGetGroupWithData.interface';

describe('ReplacementPersistenceLayer', () => {
  let service: ReplacementPersistenceLayer;

  let mockCacheService: Partial<CacheService<CreateReplacementDto>>;
  let mockReplacementRepository: Partial<ISetReplaceInStorage>;
  let mockGroupService: Partial<IGetGroupWithData>;

  beforeEach(async () => {
    mockCacheService = {
      set: jest.fn(),
    };

    mockReplacementRepository = {
      setReplacementWithDate: jest.fn(),
    };

    mockGroupService = {
      getGroupWithId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReplacementPersistenceLayer,
        { provide: CacheService, useValue: mockCacheService },
        {
          provide: 'ISetReplaceInStorage',
          useValue: mockReplacementRepository,
        },
        { provide: 'IGroupService', useValue: mockGroupService },
      ],
    }).compile();

    service = module.get<ReplacementPersistenceLayer>(
      ReplacementPersistenceLayer,
    );
  });

  describe('setReplacement', () => {
    it('should set replacement in database and cache', async () => {
      const mockGroup: GetGroupDto = {
        group_id: 1,
        id: '1I-1-23',
        title: 'mock group',
      };

      const mockGroupId: TGroupId = {
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
          },
        ],
      };

      (mockGroupService.getGroupWithId as jest.Mock).mockResolvedValue(
        mockGroup,
      );

      await service.setReplacementsWithDate(
        mockReplacementDto,
        mockReplacement,
      );

      expect(mockGroupService.getGroupWithId).toHaveBeenCalledWith({
        id: mockReplacementDto.group,
      });

      expect(mockCacheService.set).toHaveBeenCalledTimes(1);
      expect(mockCacheService.set).toHaveBeenCalledWith(
        mockGroup.id,
        mockReplacement,
      );

      expect(
        mockReplacementRepository.setReplacementWithDate,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockReplacementRepository.setReplacementWithDate,
      ).toHaveBeenCalledWith(mockGroupId, mockReplacement);
    });
  });
});
