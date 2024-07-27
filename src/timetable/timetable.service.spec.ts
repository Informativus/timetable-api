import { Test, TestingModule } from '@nestjs/testing';
import { TimetableService } from './timetable.service';
import { IGroupService } from '../group/groupService.interface';
import { ITimetableRepository } from './repositories/timetableRepository.interface';
import { CreateTimetableDto } from 'src/dto/timetable/CreateTimetable.dto';
import { GroupDto } from 'src/dto/group/group.dto';

describe('TimetableService', () => {
  let service: TimetableService;
  let mockGroupService: Partial<IGroupService>;
  let mockTimetableRepository: Partial<ITimetableRepository>;

  beforeEach(async () => {
    mockGroupService = {
      getGroupWithId: jest.fn(),
      isExistsGroup: jest.fn(),
    };

    mockTimetableRepository = {
      getTimetableWithGroup: jest.fn(),
      setTimetable: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimetableService,
        { provide: 'IGroupService', useValue: mockGroupService },
        { provide: 'ITimetableRepository', useValue: mockTimetableRepository },
      ],
    }).compile();

    service = module.get<TimetableService>(TimetableService);
  });

  describe('getTimetable', () => {
    it('should get existing timetable with group from database', async () => {
      const mockGroupDto: GroupDto = {
        id: '1I-1-23',
      };
      const mockTimetable: CreateTimetableDto[] = [
        {
          lessons: [['', '', '', '', '']],
          even: [[0, 0, 0, 0, 0]],
          odd: [[0, 0, 0, 0, 0]],
          times: [['', '', '', '', '']],
        },
      ];

      jest.spyOn(service, 'getTimetable');

      mockTimetableRepository.getTimetableWithGroup = jest
        .fn()
        .mockResolvedValue(mockTimetable);

      const result = await service.getTimetable(mockGroupDto);

      expect(result).toEqual(mockTimetable[0]);
      expect(service.getTimetable).toHaveBeenCalledTimes(1);
      expect(service.getTimetable).toHaveBeenCalledWith(mockGroupDto);

      expect(
        mockTimetableRepository.getTimetableWithGroup,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockTimetableRepository.getTimetableWithGroup,
      ).toHaveBeenCalledWith(mockGroupDto.id);
    });
  });

  describe('setTimetable', () => {
    it('should set timetable to database', async () => {
      const groupDto: GroupDto = {
        id: '1I-1-23',
      };

      const mockTimetableDto: CreateTimetableDto = {
        lessons: [['', '', '', '', '']],
        even: [[0, 0, 0, 0, 0]],
        odd: [[0, 0, 0, 0, 0]],
        times: [['', '', '', '', '']],
      };
      mockTimetableRepository.setTimetable = jest.fn().mockResolvedValue(null);
      mockGroupService.isExistsGroup = jest.fn().mockResolvedValue(true);
      jest.spyOn(service, 'setTimetable');

      await service.setTimetable(groupDto, mockTimetableDto);

      expect(service.setTimetable).toHaveBeenCalledTimes(1);
      expect(service.setTimetable).toHaveBeenCalledWith(
        groupDto,
        mockTimetableDto,
      );

      expect(mockTimetableRepository.setTimetable).toHaveBeenCalledTimes(1);
      expect(mockTimetableRepository.setTimetable).toHaveBeenCalledWith(
        groupDto.id,
        mockTimetableDto,
      );
    });
  });
});
