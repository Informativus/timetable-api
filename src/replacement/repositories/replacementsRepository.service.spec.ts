import { Test, TestingModule } from '@nestjs/testing';
import { ReplacementsRepository } from './replacementsRepository.service';
import { IRelationDatabase } from 'src/database/relationDatabase.interface';
import { validateAndMapDto } from 'src/utils/validateAndMapDto.util';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacementDto';
import { formatDateToSql } from 'src/utils/date.util';

jest.mock('src/utils/validateAndMapDto.util');

describe('ReplacementRepository', () => {
  let service: ReplacementsRepository;
  let mockRelationDatabase: Partial<IRelationDatabase>;

  beforeEach(async () => {
    mockRelationDatabase = {
      sendQuery: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReplacementsRepository,
        { provide: 'IRelationDatabase', useValue: mockRelationDatabase },
      ],
    }).compile();

    service = module.get<ReplacementsRepository>(ReplacementsRepository);
  });

  describe('getReplacementWithGroup', () => {
    it('should return replacement with group id for today from database', async () => {
      const groupTextId: string = '1I-1-23';
      const mockDatabaseResult = [
        {
          replacement: {
            success: false,
            replacements: [
              {
                index: 1,
                cancelled: false,
                teacher: 'Иванов|Иван',
                room: '101',
                title: 'Математика',
                class: '10А',
              },
            ],
          },
        },
      ];

      const mockReplacement: CreateReplacementDto[] = [
        {
          success: false,
          replacements: [
            {
              index: 1,
              cancelled: false,
              teacher: 'Иванов|Иван',
              room: '101',
              title: 'Математика',
              class: '10А',
            },
          ],
        },
      ];

      mockRelationDatabase.sendQuery = jest
        .fn()
        .mockResolvedValue(mockDatabaseResult);

      (validateAndMapDto as jest.Mock).mockResolvedValue(mockReplacement);

      const result = await service.getReplacementWithGroup(groupTextId);

      expect(result).toEqual(mockReplacement);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'SELECT replacement FROM data_on_year WHERE id = $1 AND date = current_date',
        values: [groupTextId],
      });

      expect(validateAndMapDto).toHaveBeenCalledWith(
        mockReplacement,
        CreateReplacementDto,
      );
    });
  });

  describe('getReplacementWithGroup', () => {
    it('should return replacement with group id for today from database', async () => {
      const getReplacementDto: GetReplacementDto = {
        date: '24.07.2024',
        group: '1I-1-23',
      };
      const mockDatabaseResult = [
        {
          replacement: {
            success: false,
            replacements: [
              {
                index: 1,
                cancelled: false,
                teacher: 'Иванов|Иван',
                room: '101',
                title: 'Математика',
                class: '10А',
                teacher_original: 'Иванов|Иван',
              },
            ],
          },
        },
      ];

      const mockReplacement: CreateReplacementDto[] = [
        {
          success: false,
          replacements: [
            {
              index: 1,
              cancelled: false,
              teacher: 'Иванов|Иван',
              room: '101',
              title: 'Математика',
              class: '10А',
            },
          ],
        },
      ];

      mockRelationDatabase.sendQuery = jest
        .fn()
        .mockResolvedValue(mockDatabaseResult);

      (validateAndMapDto as jest.Mock).mockResolvedValue(mockReplacement);

      const result = await service.getReplacementWithDate(getReplacementDto);

      expect(result).toEqual(mockReplacement);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'SELECT replacement FROM data_on_year WHERE date = $1 AND id = $2',
        values: [
          formatDateToSql(getReplacementDto.date),
          getReplacementDto.group,
        ],
      });

      expect(validateAndMapDto).toHaveBeenCalledWith(
        mockReplacement,
        CreateReplacementDto,
      );
    });
  });
});
