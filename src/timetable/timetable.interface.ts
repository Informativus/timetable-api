import { timetableType } from './types/timetable.type';
import { TimetableDto } from '../dto/timetable.dto';

export interface ITimetable {
  getTimetable(groupId: TimetableDto): Promise<timetableType>;
  setTimetable(groupTextId: TimetableDto, timetable: timetableType): void;
}
