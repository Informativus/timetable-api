import { IRelationDatabase } from 'src/database/relationDatabase.interface';
import { TimetableRepositoryService } from './timetableRepository.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('TimetableRepository', () => {
  let service: TimetableRepositoryService;
  let mockRelationDatabase: Partial<IRelationDatabase>;

  beforeEach(async () => {
    mockRelationDatabase = {
      sendQuery: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimetableRepositoryService,
        { provide: 'IRelationDatabase', useValue: mockRelationDatabase },
      ],
    }).compile();

    service = module.get<TimetableRepositoryService>(
      TimetableRepositoryService,
    );
  });

  describe('getTimetableWithGroupId', () => {
    it('should get timetable from database', async () => {
      const mockTimetable = [{ timetable: 'mock timetable' }];
      mockRelationDatabase.sendQuery = jest
        .fn()
        .mockResolvedValue(mockTimetable);

      const result = await service.getTimetableWithGroup('1I-1-23');
      expect(result).toEqual(mockTimetable);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'SELECT timetable FROM timetables WHERE group_id = $1',
        values: ['1I-1-23'],
      });
    });
  });
});
