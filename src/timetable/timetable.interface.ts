import { CreateTimetableDto } from '../dto/timetable/CreateTimetable.dto';
import { TimetableDto } from '../dto/timetable/timetable.dto';

export interface ITimetable {
  getTimetable(groupId: TimetableDto): Promise<CreateTimetableDto>;
  setTimetable(groupTextId: TimetableDto, timetable: CreateTimetableDto): void;
}
