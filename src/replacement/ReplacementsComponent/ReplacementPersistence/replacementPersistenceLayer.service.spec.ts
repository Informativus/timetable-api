import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from 'src/cache/cache.service';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';
import { TGroupId } from 'src/group/types/groupId.type';
import { IGetGroupWithData } from '../../../group/Interfaces/IGetGroupWithData.interface';
import { ISetReplaceInStorage } from '../ReplacementsRepository/Interfaces/ISetReplaceInStorage.interface';
import { ReplacementPersistenceLayer } from './replacementPersistenceLayer.service';

describe('ReplacementPersistenceLayer', () => {
  let service: ReplacementPersistenceLayer;

  let mockReplacementRepository: Partial<ISetReplaceInStorage>;
  let mockGroupService: Partial<IGetGroupWithData>;

  beforeEach(async () => {
    mockReplacementRepository = {
      setReplacementWithDate: jest.fn(),
      setReplacementInCache: jest.fn(),
    };

    mockGroupService = {
      getGroupWithId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReplacementPersistenceLayer,
        {
          provide: 'ISetReplaceInStorage',
          useValue: mockReplacementRepository,
        },
        { provide: 'IGetGroupWithData', useValue: mockGroupService },
      ],
    }).compile();

    service = module.get<ReplacementPersistenceLayer>(
      ReplacementPersistenceLayer,
    );
  });

  describe('setReplacement', () => {
    it('should set replacement in database', async () => {
      const replacementsDto: GetReplacementDto = {
        group: '1',
        date: '2022-01-01',
      };

      const replacements: CreateReplacementDto = {
        success: true,
        replacements: [
          {
            index: 1,
            cancelled: false,
            teacher: '1',
            room: '1',
            title: '1',
            class: '1',
          },
        ],
      };

      const groupId: TGroupId = {
        group_id: 1,
      };

      const getGroupId = jest
        .spyOn(service as any, 'getGroupId')
        .mockResolvedValue(groupId);

      jest
        .spyOn(mockReplacementRepository, 'setReplacementWithDate')
        .mockResolvedValue();

      await service.setReplacementsWithDate(replacementsDto, replacements);

      expect(getGroupId).toHaveBeenCalledTimes(1);
      expect(getGroupId).toHaveBeenCalledWith(replacementsDto);

      expect(
        mockReplacementRepository.setReplacementWithDate,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockReplacementRepository.setReplacementWithDate,
      ).toHaveBeenCalledWith(groupId, replacements, replacementsDto.date);
    });

    it('should throw error if group not found', async () => {
      const replacementsDto: GetReplacementDto = {
        group: '1',
        date: '2022-01-01',
      };

      const replacements: CreateReplacementDto = {
        success: true,
        replacements: [
          {
            index: 1,
            cancelled: false,
            teacher: '1',
            room: '1',
            title: '1',
            class: '1',
          },
        ],
      };

      const getGroupId = jest
        .spyOn(service as any, 'getGroupId')
        .mockImplementation(() => {
          throw new BadRequestException('Failed to get group');
        });

      await expect(
        service.setReplacementsWithDate(replacementsDto, replacements),
      ).rejects.toThrow(new BadRequestException('Failed to get group'));

      expect(getGroupId).toHaveBeenCalledTimes(1);
      expect(getGroupId).toHaveBeenCalledWith(replacementsDto);

      expect(
        mockReplacementRepository.setReplacementWithDate,
      ).not.toHaveBeenCalled();
    });
    it('should throw error set replacement in database', async () => {
      const replacementsDto: GetReplacementDto = {
        group: '1',
        date: '2022-01-01',
      };

      const replacements: CreateReplacementDto = {
        success: true,
        replacements: [
          {
            index: 1,
            cancelled: false,
            teacher: '1',
            room: '1',
            title: '1',
            class: '1',
          },
        ],
      };

      const groupId: TGroupId = {
        group_id: 1,
      };

      const getGroupId = jest
        .spyOn(service as any, 'getGroupId')
        .mockResolvedValue(groupId);

      jest
        .spyOn(mockReplacementRepository, 'setReplacementWithDate')
        .mockImplementation(() => {
          throw new InternalServerErrorException(
            'Failed to set replacement in database',
          );
        });

      await expect(
        service.setReplacementsWithDate(replacementsDto, replacements),
      ).rejects.toThrow(
        new InternalServerErrorException(
          'Failed to set replacement in database',
        ),
      );

      expect(getGroupId).toHaveBeenCalledTimes(1);
      expect(getGroupId).toHaveBeenCalledWith(replacementsDto);

      expect(
        mockReplacementRepository.setReplacementWithDate,
      ).toHaveBeenCalledTimes(1);

      expect(
        mockReplacementRepository.setReplacementWithDate,
      ).toHaveBeenCalledWith(groupId, replacements, replacementsDto.date);
    });
  });

  describe('setReplacementInCache', () => {
    it('should set replacement in cache', async () => {
      const replacement: CreateReplacementDto = {
        success: true,
        replacements: [
          {
            index: 1,
            cancelled: false,
            teacher: '1',
            room: '1',
            title: '1',
            class: '1',
          },
        ],
      };

      const key: string = 'key';

      await service.setReplacementInCache(replacement, key);

      expect(
        mockReplacementRepository.setReplacementInCache,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockReplacementRepository.setReplacementInCache,
      ).toHaveBeenCalledWith(key, replacement);
    });
    it('should throw error set replacement in cache', async () => {
      const replacement: CreateReplacementDto = {
        success: true,
        replacements: [
          {
            index: 1,
            cancelled: false,
            teacher: '1',
            room: '1',
            title: '1',
            class: '1',
          },
        ],
      };

      const key: string = 'key';

      jest
        .spyOn(mockReplacementRepository, 'setReplacementInCache')
        .mockImplementation(() => {
          throw new InternalServerErrorException(
            'Failed to set replacement in cache',
          );
        });

      await expect(
        service.setReplacementInCache(replacement, key),
      ).rejects.toThrow(
        new InternalServerErrorException('Failed to set replacement in cache'),
      );

      expect(
        mockReplacementRepository.setReplacementInCache,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockReplacementRepository.setReplacementInCache,
      ).toHaveBeenCalledWith(key, replacement);
    });
  });
});
