import { IGroupService } from 'src/group/groupService.interface';
import { GetReplacementsWithDate } from './getReplacementsWithDate.service';
import { Test, TestingModule } from '@nestjs/testing';
import { IGetReplaceWithDate } from '../repositories/Interfaces/IGetReplaceWithDate.interface';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';

describe('GetReplacementsWithDate', () => {
  let service: GetReplacementsWithDate;

  let mockReplacementRepository: Partial<IGetReplaceWithDate>;
  let mockGroupService: Partial<IGroupService>;

  beforeEach(async () => {
    mockReplacementRepository = {
      getReplacementWithDate: jest.fn(),
    };

    mockGroupService = {
      getGroupWithId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetReplacementsWithDate,
        {
          provide: 'IGetReplaceWithDate',
          useValue: mockReplacementRepository,
        },
        { provide: 'IGroupService', useValue: mockGroupService },
      ],
    }).compile();

    service = module.get<GetReplacementsWithDate>(GetReplacementsWithDate);
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
