import { Test, TestingModule } from '@nestjs/testing';
import { TimetableService } from './timetable.service';
import { IGroupService } from '../group/groupService.interface';
import { ITimetableRepository } from './repositories/timetableRepository.interface';
import { CreateTimetableDto } from 'src/dto/timetable/CreateTimetable.dto';
import { GroupDto } from 'src/dto/group/group.dto';
import { GroupId } from 'src/group/types/groupId.type';

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

      const groupId: GroupId = {
        group_id: 1,
      };

      jest.spyOn(service, 'setTimetable');

      mockGroupService.getGroupWithId = jest.fn().mockResolvedValue(groupId);

      await service.setTimetable(groupDto, mockTimetableDto);

      expect(service.setTimetable).toHaveBeenCalledTimes(1);
      expect(service.setTimetable).toHaveBeenCalledWith(
        groupDto,
        mockTimetableDto,
      );

      expect(mockGroupService.getGroupWithId).toHaveBeenCalledTimes(1);
      expect(mockGroupService.getGroupWithId).toHaveBeenCalledWith(groupDto);

      expect(mockTimetableRepository.setTimetable).toHaveBeenCalledTimes(1);
      expect(mockTimetableRepository.setTimetable).toHaveBeenCalledWith(
        groupId,
        mockTimetableDto,
      );
    });
  });
});
