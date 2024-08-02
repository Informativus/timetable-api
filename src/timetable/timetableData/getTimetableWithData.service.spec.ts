import { IGetGroupWithData } from 'src/group/Interfaces/IGetGroupWithData.interface';
import { GetTimetableWithData } from './getTimetableWithData.service';
import { ITimetableRepository } from '../repositories/timetableRepository.interface';
import { Test, TestingModule } from '@nestjs/testing';
import {
  GET_GROUP_WITH_DATA,
  TIMETABLE_REPOSITORY,
} from 'src/config/constants';
import { GroupDto } from 'src/dto/group/group.dto';
import { CreateTimetableDto } from 'src/dto/timetable/CreateTimetable.dto';

describe('GetTimetableWithData', () => {
  let service: GetTimetableWithData;
  let mockGroupService: Partial<IGetGroupWithData>;
  let mockTimetableRepository: Partial<ITimetableRepository>;

  beforeEach(async () => {
    mockGroupService = {
      getGroupWithId: jest.fn(),
    };

    mockTimetableRepository = {
      setTimetable: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetTimetableWithData,
        { provide: GET_GROUP_WITH_DATA, useValue: mockGroupService },
        { provide: TIMETABLE_REPOSITORY, useValue: mockTimetableRepository },
      ],
    }).compile();

    service = module.get<GetTimetableWithData>(GetTimetableWithData);
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
});
