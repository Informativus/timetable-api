import { Test, TestingModule } from '@nestjs/testing';
import { IReplacementRepository } from './repositories/replacementsRepository.interface';
import { IGroupService } from 'src/group/groupService.interface';
import { ReplacementService } from './replacement.service';
import { CacheService } from 'src/cache/cache.service';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GroupId } from 'src/group/types/groupId.type';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacementDto';
import { BadRequestException } from '@nestjs/common';

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
        ReplacementService,
        { provide: CacheService, useValue: mockCacheService },
        {
          provide: 'IReplacementRepository',
          useValue: mockReplacementRepository,
        },
        { provide: 'IGroupService', useValue: mockGroupService },
      ],
    }).compile();

    service = module.get<ReplacementService>(ReplacementService);
  });

  describe('setReplacement', () => {
    it('should set replacement in database and cache', async () => {
      const mockGroup: GetGroupDto = {
        group_id: 1,
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

      (mockGroupService.getGroupWithId as jest.Mock).mockResolvedValue(
        mockGroup,
      );

      await service.setReplacements(mockReplacementDto, mockReplacement);

      expect(mockGroupService.getGroupWithId).toHaveBeenCalledWith({
        id: mockReplacementDto.group,
      });

      expect(mockCacheService.set).toHaveBeenCalledTimes(1);
      expect(mockCacheService.set).toHaveBeenCalledWith(
        mockGroup.id,
        mockReplacement,
      );

      expect(mockReplacementRepository.setReplacement).toHaveBeenCalledTimes(1);
      expect(mockReplacementRepository.setReplacement).toHaveBeenCalledWith(
        mockGroupId,
        mockReplacement,
      );
    });
  });

  describe('getReplacementsWithGroup', () => {
    it('should get replacement from cache', async () => {
      const mockReplacementDto: GetReplacementDto = {
        group: '1I-1-23',
      };

      const mockCreateReplacement: CreateReplacementDto = {
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

      mockCacheService.get = jest.fn().mockResolvedValue(mockCreateReplacement);

      const result = await service.getReplacementsWithGroup(mockReplacementDto);

      expect(result).toEqual(mockCreateReplacement);

      expect(mockCacheService.get).toHaveBeenCalledTimes(1);
      expect(mockCacheService.get).toHaveBeenCalledWith(
        mockReplacementDto.group,
      );
    });

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
              teacher_original: 'Иванов|Иван',
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

  describe('getReplacementsWithDate', () => {
    it('should get replacement from database', async () => {
      const mockReplacementDto: GetReplacementDto = {
        group: '1I-1-23',
        date: '2022-01-01',
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
              teacher_original: 'Иванов|Иван',
            },
          ],
        },
      ];

      mockReplacementRepository.getReplacementWithDate = jest
        .fn()
        .mockResolvedValue(resultInDatabase);

      const result = await service.getReplacementsWithDate(mockReplacementDto);

      expect(result).toEqual(resultInDatabase[0]);
      expect(
        mockReplacementRepository.getReplacementWithDate,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockReplacementRepository.getReplacementWithDate,
      ).toHaveBeenCalledWith(mockReplacementDto);
    });

    it('should get success false', async () => {
      const mockReplacementDto: GetReplacementDto = {
        group: '1I-1-23',
        date: '22.01.2024',
      };

      const resultInDatabase: CreateReplacementDto[] = [];

      mockReplacementRepository.getReplacementWithDate = jest
        .fn()
        .mockReturnValue(resultInDatabase);

      const result = await service.getReplacementsWithDate(mockReplacementDto);

      expect(result).toEqual({ success: false });
      expect(
        mockReplacementRepository.getReplacementWithDate,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockReplacementRepository.getReplacementWithDate,
      ).toHaveBeenCalledWith(mockReplacementDto);
    });
  });
});
