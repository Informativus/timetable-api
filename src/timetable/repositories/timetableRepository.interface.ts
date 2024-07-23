import { CreateTimetableDto } from '../../dto/timetable/CreateTimetable.dto';

export interface ITimetableRepository {
  getTimetableWithGroupId(groupId: number): Promise<CreateTimetableDto>;

  setTimetable(groupId: number, timetable: CreateTimetableDto): Promise<void>;
}
