import { CreateTimetableDto } from '../dto/timetable/CreateTimetable.dto';
import { GroupDto } from '../dto/group/group.dto';

export interface ITimetable {
  getTimetable(groupId: GroupDto): Promise<CreateTimetableDto>;
  setTimetable(groupTextId: GroupDto, timetable: CreateTimetableDto): void;
}
