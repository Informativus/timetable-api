import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from 'src/cache/cache.service';
import {
  GET_GROUP_WITH_DATA,
  GET_REPLACEMENTS_WITH_GROUP,
} from 'src/config/constants/constants';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';
import { IGetGroupWithData } from 'src/group/Interfaces/IGetGroupWithData.interface';
import { IGetReplaceWithGroup } from '../repositories/Interfaces/IGetReplaceWithGroup.interface';
import { GetReplacementsWithGroup } from './getReplacementsWithGroup.service';

describe('GetReplacementsWithGroup', () => {
  let service: GetReplacementsWithGroup;

  let mockCacheService: Partial<CacheService<CreateReplacementDto>>;
  let mockReplacementRepository: Partial<IGetReplaceWithGroup>;
  let mockGroupService: Partial<IGetGroupWithData>;

  beforeEach(async () => {
    mockCacheService = {
      get: jest.fn(),
      set: jest.fn(),
    };

    mockReplacementRepository = {
      getReplacementWithGroup: jest.fn(),
    };

    mockGroupService = {
      getGroupWithId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetReplacementsWithGroup,
        { provide: CacheService, useValue: mockCacheService },
        {
          provide: GET_REPLACEMENTS_WITH_GROUP,
          useValue: mockReplacementRepository,
        },
        { provide: GET_GROUP_WITH_DATA, useValue: mockGroupService },
      ],
    }).compile();

    service = module.get<GetReplacementsWithGroup>(GetReplacementsWithGroup);
  });

  describe('getReplacementsWithGroup', () => {
    it('should get replacement from cache', async () => {});

    it('should get replacement from database', async () => {
      const mockReplacementDto: GetReplacementDto = {
        group: '1I-1-23',
      };

      const resultInDatabase: CreateReplacementDto[] = [
        {
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
        },
      ];

      mockCacheService.get = jest.fn().mockResolvedValue(null);

      mockReplacementRepository.getReplacementWithGroup = jest
        .fn()
        .mockResolvedValue(resultInDatabase);

      const result = await service.getReplacementsWithGroup(mockReplacementDto);

      expect(result).toEqual(resultInDatabase[0]);

      expect(mockCacheService.get).toHaveBeenCalledTimes(1);
      expect(mockCacheService.get).toHaveBeenCalledWith(
        mockReplacementDto.group,
      );

      expect(
        mockReplacementRepository.getReplacementWithGroup,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockReplacementRepository.getReplacementWithGroup,
      ).toHaveBeenCalledWith(mockReplacementDto.group);
    });

    it('should get replacement false', async () => {
      const mockReplacementDto: GetReplacementDto = {
        group: '1I-1-23',
      };

      const resultInDatabase: CreateReplacementDto[] = [];

      const mockResult = {
        success: false,
      };

      mockCacheService.get = jest.fn().mockResolvedValue(null);
      mockReplacementRepository.getReplacementWithGroup = jest
        .fn()
        .mockResolvedValue(resultInDatabase);

      const result = await service.getReplacementsWithGroup(mockReplacementDto);

      expect(result).toEqual(mockResult);

      expect(mockCacheService.get).toHaveBeenCalledTimes(1);
      expect(mockCacheService.get).toHaveBeenCalledWith(
        mockReplacementDto.group,
      );

      expect(
        mockReplacementRepository.getReplacementWithGroup,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockReplacementRepository.getReplacementWithGroup,
      ).toHaveBeenCalledWith(mockReplacementDto.group);
    });

    it('should throw error group not found', async () => {
      mockGroupService.getGroupWithId = jest
        .fn()
        .mockRejectedValue(new BadRequestException('Group does not exist'));
    });
  });
});
