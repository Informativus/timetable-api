import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from 'src/cache/cache.service';
import {
  GET_GROUP_WITH_DATA,
  GET_REPLACEMENTS_WITH_DATE,
} from 'src/config/constants/constants';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';
import { IGetGroupWithData } from 'src/group/Interfaces/IGetGroupWithData.interface';
import * as ensureGroupExistsModule from 'src/utils/group.util';
import * as isTodayDateModule from 'src/utils/isTodayDate.util';
import { IGetReplaceWithDate } from '../ReplacementsRepository/Interfaces/IGetReplaceWithDate.interface';
import { IInserterReplacementInCache } from '../ReplacementPersistence/InserterReplacementInCache.interface';
import { ReplacementPersistenceLayer } from '../ReplacementPersistence/replacementPersistenceLayer.service';
import { TReplacementData } from '../Types/replacementData.type';
import { ReplacementData } from './replacementData.service';
import { SuccessStatusDto } from 'src/dto/successStatus.dto';

describe('ReplacementData', () => {
  let service: ReplacementData;

  let mockReplaceRepoWithDate: Partial<IGetReplaceWithDate>;
  let mockSetReplacements: Partial<IInserterReplacementInCache>;
  let mockGroupService: Partial<IGetGroupWithData>;
  let mockCacheService: Partial<CacheService<CreateReplacementDto>>;

  beforeEach(async () => {
    mockReplaceRepoWithDate = {
      getReplacementWithDate: jest.fn(),
    };

    mockSetReplacements = {
      setReplacementInCache: jest.fn(),
    };

    mockCacheService = {
      get: jest.fn(),
    };

    mockGroupService = {
      getGroupWithId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReplacementData,
        { provide: CacheService, useValue: mockCacheService },
        { provide: ReplacementPersistenceLayer, useValue: mockSetReplacements },
        {
          provide: GET_REPLACEMENTS_WITH_DATE,
          useValue: mockReplaceRepoWithDate,
        },
        { provide: GET_GROUP_WITH_DATA, useValue: mockGroupService },
      ],
    }).compile();

    service = module.get<ReplacementData>(ReplacementData);
    jest.clearAllMocks();
  });

  describe('getReplacementsWithDate', () => {
    it('should return replacements from cache', async () => {
      const mockEnsureGroupExists = jest.spyOn(
        ensureGroupExistsModule,
        'ensureGroupExists',
      );

      const mockReplaceDto: GetReplacementDto = {
        group: '1I-1-23',
        date: '2024-08-15',
      };

      const mockReplaceData: CreateReplacementDto = {
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

      const cacheKey: string = `${mockReplaceDto.group}|${mockReplaceDto.date}`;
      mockCacheService.get = jest.fn().mockReturnValue(mockReplaceData);

      const result = await service.getReplacementsWithDate(mockReplaceDto);
      expect(result).toEqual(mockReplaceData);
      expect(mockEnsureGroupExists).toHaveBeenCalledWith(mockGroupService, {
        id: mockReplaceDto.group,
      });

      expect(mockCacheService.get).toHaveBeenCalledTimes(1);
      expect(mockCacheService.get).toHaveBeenCalledWith(cacheKey);

      expect(mockEnsureGroupExists).toHaveBeenCalledTimes(1);
      expect(mockEnsureGroupExists).toHaveBeenCalledWith(mockGroupService, {
        id: mockReplaceDto.group,
      });
    });

    it('should return replacements from database', async () => {
      const mockEnsureGroupExists = jest.spyOn(
        ensureGroupExistsModule,
        'ensureGroupExists',
      );

      const mockIsTodayDate = jest
        .spyOn(isTodayDateModule, 'isTodayDate')
        .mockReturnValue(false);

      const mockReplaceDto: GetReplacementDto = {
        group: '1I-1-23',
        date: '2024-08-15',
      };

      const mockReplaceData: TReplacementData[] = [
        {
          date: new Date('2024-08-15'),
          replacement: {
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
        },
      ];

      const cacheKey: string = `${mockReplaceDto.group}|${mockReplaceDto.date}`;
      mockCacheService.get = jest.fn().mockReturnValue(undefined);

      mockReplaceRepoWithDate.getReplacementWithDate = jest
        .fn()
        .mockReturnValue(mockReplaceData);

      const result = await service.getReplacementsWithDate(mockReplaceDto);
      expect(result).toEqual(mockReplaceData[0].replacement);

      expect(mockEnsureGroupExists).toHaveBeenCalledTimes(1);
      expect(mockEnsureGroupExists).toHaveBeenCalledWith(mockGroupService, {
        id: mockReplaceDto.group,
      });

      expect(mockCacheService.get).toHaveBeenCalledTimes(1);
      expect(mockCacheService.get).toHaveBeenCalledWith(cacheKey);

      expect(
        mockReplaceRepoWithDate.getReplacementWithDate,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockReplaceRepoWithDate.getReplacementWithDate,
      ).toHaveBeenCalledWith(mockReplaceDto);

      expect(mockIsTodayDate).toHaveBeenCalledTimes(1);
      expect(mockIsTodayDate).toHaveBeenCalledWith(mockReplaceData[0].date);
    });

    it('should return replacements from database and set replacement in cache', async () => {
      const mockEnsureGroupExists = jest.spyOn(
        ensureGroupExistsModule,
        'ensureGroupExists',
      );

      const mockIsTodayDate = jest
        .spyOn(isTodayDateModule, 'isTodayDate')
        .mockReturnValue(true);

      const mockReplaceDto: GetReplacementDto = {
        group: '1I-1-23',
        date: '2024-08-15',
      };

      const mockReplaceData: TReplacementData[] = [
        {
          date: new Date('2024-08-15'),
          replacement: {
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
        },
      ];

      const cacheKey: string = `${mockReplaceDto.group}|${mockReplaceDto.date}`;
      mockCacheService.get = jest.fn().mockReturnValue(undefined);

      mockReplaceRepoWithDate.getReplacementWithDate = jest
        .fn()
        .mockReturnValue(mockReplaceData);

      const result = await service.getReplacementsWithDate(mockReplaceDto);
      expect(result).toEqual(mockReplaceData[0].replacement);

      expect(mockEnsureGroupExists).toHaveBeenCalledTimes(1);
      expect(mockEnsureGroupExists).toHaveBeenCalledWith(mockGroupService, {
        id: mockReplaceDto.group,
      });

      expect(mockCacheService.get).toHaveBeenCalledTimes(1);
      expect(mockCacheService.get).toHaveBeenCalledWith(cacheKey);

      expect(
        mockReplaceRepoWithDate.getReplacementWithDate,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockReplaceRepoWithDate.getReplacementWithDate,
      ).toHaveBeenCalledWith(mockReplaceDto);

      expect(mockIsTodayDate).toHaveBeenCalledTimes(1);
      expect(mockIsTodayDate).toHaveBeenCalledWith(mockReplaceData[0].date);

      expect(mockSetReplacements.setReplacementInCache).toHaveBeenCalledTimes(
        1,
      );
      expect(mockSetReplacements.setReplacementInCache).toHaveBeenCalledWith(
        mockReplaceData[0].replacement,
        cacheKey,
      );
    });

    it('should return success false', async () => {
      const mockEnsureGroupExists = jest.spyOn(
        ensureGroupExistsModule,
        'ensureGroupExists',
      );

      const mockReplaceDto: GetReplacementDto = {
        group: '1I-1-23',
        date: '2024-08-15',
      };

      const mockReplaceData: TReplacementData[] = [];

      const mockSuccess: SuccessStatusDto = {
        success: false,
      };

      const cacheKey: string = `${mockReplaceDto.group}|${mockReplaceDto.date}`;
      mockCacheService.get = jest.fn().mockReturnValue(undefined);

      mockReplaceRepoWithDate.getReplacementWithDate = jest
        .fn()
        .mockReturnValue(mockReplaceData);

      const result = await service.getReplacementsWithDate(mockReplaceDto);
      expect(result).toEqual(mockSuccess);

      expect(mockEnsureGroupExists).toHaveBeenCalledTimes(1);
      expect(mockEnsureGroupExists).toHaveBeenCalledWith(mockGroupService, {
        id: mockReplaceDto.group,
      });

      expect(mockCacheService.get).toHaveBeenCalledTimes(1);
      expect(mockCacheService.get).toHaveBeenCalledWith(cacheKey);

      expect(
        mockReplaceRepoWithDate.getReplacementWithDate,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockReplaceRepoWithDate.getReplacementWithDate,
      ).toHaveBeenCalledWith(mockReplaceDto);
    });
  });
});
