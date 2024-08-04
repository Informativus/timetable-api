import { GroupDto } from 'src/dto/group/group.dto';
import { CreateTimetableDto } from 'src/dto/timetable/CreateTimetable.dto';

export interface ISetTimetableInStorage {
  setTimetableInDb(
    groupDto: GroupDto,
    timetable: CreateTimetableDto,
  ): Promise<void>;
}
