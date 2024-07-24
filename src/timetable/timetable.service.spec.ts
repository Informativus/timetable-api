import { Test, TestingModule } from '@nestjs/testing';
import { TimetableService } from './timetable.service';
import { IRelationDatabase } from '../database/relationDatabase.interface';
import { IGroup } from '../group/group.interface';
import { BadRequestException } from '@nestjs/common';
import { CreateTimetableDto } from '../dto/timetable/CreateTimetable.dto';

describe('TimetableService', () => {
  let service: TimetableService;
  let mockRelationDatabase: Partial<IRelationDatabase>;
  let mockGroupService: Partial<IGroup>;
  const groupToDatabase: string = '1I-1-23';
  const groupIdInDatabase: number = 2;

  beforeEach(async () => {
    mockRelationDatabase = {
      sendQuery: jest.fn(),
    };
    mockGroupService = {
      getGroupWithId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimetableService,
        { provide: 'IRelationDatabase', useValue: mockRelationDatabase },
        { provide: 'IGroup', useValue: mockGroupService },
      ],
    }).compile();

    service = module.get<TimetableService>(TimetableService);
  });

  describe('setTimetable', () => {
    it('should set timetable in database', async () => {
      // Mock the methods
      mockGroupService.getGroupWithId = jest
        .fn()
        .mockResolvedValue({ group_id: groupIdInDatabase });
      mockRelationDatabase.sendQuery = jest
        .fn()
        .mockResolvedValueOnce([]) // For checking existing timetable
        .mockResolvedValueOnce(null); // For inserting new timetable

      const timetableData: CreateTimetableDto = {
        lessons: [
          ['', '', '', ''],
          ['Разговоры о важном', '105', 'Чернышева|А|М|', ''],
          ['Индивидуальный проект', '202', 'Перепеличный|Ф|С|', ''],
          ['Физика', '401', 'Башанаев|Р|К|', ''],
          ['Математика', '410', 'Соловьева|Е|К|', ''],
          ['История', '309', 'Ситнова|О|А|', ''],
          [
            'Введение нейросети и искусственный интелект',
            '105',
            'Чернышева|А|М|',
            '',
          ],
          ['Литература', '407', 'Степченкова|В|А|', ''],
          [
            'Обеспечение безопасного функционирования компьютерных сетей',
            '105',
            'Чернышева|А|М|',
            '',
          ],
          ['Информатика', '204', 'Иванова|В|А|', ''],
          ['Русский язык', '407', 'Степченкова|В|А|', ''],
          ['География', '408', 'Фейзуллаева|Э|М|', ''],
          [
            'ДУП 01 Технологиия выполнения работ по профессии"Консультант в области развития цифровой грамотности населения (цифровой куратор)"',
            '_204',
            'Иванова|В|А|',
            '',
          ],
          ['Консбедициальное делопроизводство', '105', 'Чернышева|А|М|', ''],
          ['Биология', '406', 'Фимин|К|С|', ''],
          ['Обществознание', '309', 'Ситнова|О|А|', ''],
          ['Основы безопасности жизнедеятельности', '310', 'Смирнов|А|М|', ''],
          ['Физическая культура', 'Трен', 'Чернова|Л|Л|', ''],
        ],
        even: [
          [1, 2, 3, 4, 0, 0],
          [0, 5, 6, 4, 7, 0],
          [0, 8, 9, 10, 11, 0],
          [0, 0, 3, 12, 8, 0],
          [0, 0, 13, 14, 15, 4],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
        ],
        odd: [
          [1, 16, 3, 4, 0, 0],
          [0, 5, 6, 4, 7, 0],
          [0, 8, 17, 10, 11, 0],
          [0, 0, 4, 12, 8, 0],
          [0, 0, 13, 14, 15, 4],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
        ],
        times: [
          ['8', '10', '8', '55'],
          ['9', '00', '10', '30'],
          ['10', '50', '12', '20'],
          ['12', '40', '14', '10'],
          ['14', '30', '16', '00'],
          ['16', '10', '17', '40'],
        ],
      };
      await service.setTimetable({ group: groupToDatabase }, timetableData);

      expect(mockGroupService.getGroupWithId).toHaveBeenCalledWith({
        textId: groupToDatabase,
      });
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledTimes(2);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'SELECT timetable FROM timetables WHERE groupId = $1',
        values: [groupIdInDatabase],
      });
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'INSERT INTO timetables (group_id, timetable) VALUES ($1, $2)',
        values: [groupIdInDatabase, JSON.stringify(timetableData)],
      });
    });

    it('should throw an error if timetable already exists', async () => {
      mockGroupService.getGroupWithId = jest
        .fn()
        .mockResolvedValue({ group_id: groupIdInDatabase });
      mockRelationDatabase.sendQuery = jest
        .fn()
        .mockResolvedValueOnce([{ timetable: 'existing timetable' }]); // For checking existing timetable

      await expect(
        service.setTimetable({ group: groupToDatabase }, {} as any),
      ).rejects.toThrow('Timetable already exists');

      expect(mockGroupService.getGroupWithId).toHaveBeenCalledWith({
        textId: groupToDatabase,
      });
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledTimes(1);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'SELECT timetable FROM timetables WHERE groupId = $1',
        values: [groupIdInDatabase],
      });
    });
  });

  describe('getTimetable', () => {
    it('should get timetable from database', async () => {
      const mockTimetable = [{ timetable: 'mock timetable' }];
      mockRelationDatabase.sendQuery = jest
        .fn()
        .mockResolvedValue(mockTimetable);

      const result = await service.getTimetable({
        group: groupToDatabase,
      } as TimetableDto);

      expect(result).toEqual(mockTimetable[0]);
      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'SELECT tb.timetable FROM timetables tb JOIN student_groups sg ON tb.group_id = sg.group_id where sg.text_id = $1',
        values: [groupToDatabase],
      });
    });

    it('should throw an error if timetable not found', async () => {
      mockRelationDatabase.sendQuery = jest.fn().mockResolvedValue([]);

      await expect(
        service.getTimetable({ group: groupToDatabase } as TimetableDto),
      ).rejects.toThrow(BadRequestException);

      expect(mockRelationDatabase.sendQuery).toHaveBeenCalledWith({
        text: 'SELECT tb.timetable FROM timetables tb JOIN student_groups sg ON tb.group_id = sg.group_id where sg.text_id = $1',
        values: [groupToDatabase],
      });
    });
  });
});
