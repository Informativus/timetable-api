import { Test, TestingModule } from '@nestjs/testing';
import { SetTimetableInDb } from './setTimetableInDb.service';
import { IGetGroupWithData } from 'src/group/Interfaces/IGetGroupWithData.interface';
import { ITimetableRepository } from '../repositories/timetableRepository.interface';
import {
  GET_GROUP_WITH_DATA,
  TIMETABLE_REPOSITORY,
} from 'src/config/constants';
import { GroupId } from 'src/group/types/groupId.type';
import { CreateTimetableDto } from 'src/dto/timetable/CreateTimetable.dto';
import { GroupDto } from 'src/dto/group/group.dto';

describe('SetTimetableInDb', () => {
  let service: SetTimetableInDb;
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
        SetTimetableInDb,
        { provide: GET_GROUP_WITH_DATA, useValue: mockGroupService },
        { provide: TIMETABLE_REPOSITORY, useValue: mockTimetableRepository },
      ],
    }).compile();

    service = module.get<SetTimetableInDb>(SetTimetableInDb);
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
