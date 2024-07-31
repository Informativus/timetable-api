import { IRelationDatabase } from 'src/database/relationDatabase.interface';
import { TimetableRepository } from './timetableRepository.service';
import { Test, TestingModule } from '@nestjs/testing';
import { validateAndMapDto } from '../../utils/validateAndMapDto.util';
import { CreateTimetableDto } from 'src/dto/timetable/CreateTimetable.dto';

jest.mock('src/utils/validateAndMapDto.util');

describe('TimetableRepository', () => {
  let service: TimetableRepository;
  let mockRelationDatabase: Partial<IRelationDatabase>;

  beforeEach(async () => {
    mockRelationDatabase = {
      sendQuery: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimetableRepository,
        { provide: 'IRelationDatabase', useValue: mockRelationDatabase },
      ],
    }).compile();

    service = module.get<TimetableRepository>(TimetableRepository);
  });

  describe('getTimetableWithGroup', () => {
    it('should get timetable from database', async () => {
      const mockDatabaseResult = [
        {
          timetable: {
            lessons: [['', '', '', '', '']],
            even: [[0, 0, 0, 0, 0]],
            odd: [[0, 0, 0, 0, 0]],
            times: [['', '', '', '', '']],
          },
        },
      ];
      const mockTimetable = [
        {
          lessons: [['', '', '', '', '']],
          even: [[0, 0, 0, 0, 0]],
          odd: [[0, 0, 0, 0, 0]],
          times: [['', '', '', '', '']],
        },
      ];
      mockRelationDatabase.sendQuery = jest
        .fn()
        .mockResolvedValue(mockDatabaseResult);

      (validateAndMapDto as jest.Mock).mockReturnValue(mockTimetable);

      const result = await service.getTimetableWithGroup('1I-1-23');

      expect(result).toEqual(mockTimetable);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'SELECT timetable FROM data_on_year where id = $1 order by date DESC LIMIT 1',
        values: ['1I-1-23'],
      });

      expect(validateAndMapDto).toHaveBeenCalledWith(
        mockTimetable,
        CreateTimetableDto,
      );
    });
  });

  describe('setTimetable', () => {
    it('should set timetable to database', async () => {
      const mockTimetable: CreateTimetableDto = {
        lessons: [['', '', '', '', '']],
        even: [[0, 0, 0, 0, 0]],
        odd: [[0, 0, 0, 0, 0]],
        times: [['', '', '', '', '']],
      };
      mockRelationDatabase.sendQuery = jest.fn().mockResolvedValue(null);

      await service.setTimetable({ group_id: 1 }, mockTimetable);

      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledTimes(1);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'INSERT INTO timetables (id, timetable) VALUES ($1, $2)',
        values: [1, JSON.stringify(mockTimetable)],
      });
    });
  });
});
