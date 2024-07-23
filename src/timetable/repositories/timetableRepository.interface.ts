import { CreateTimetableDto } from '../../dto/timetable/CreateTimetable.dto';

export interface ITimetableRepository {
  getTimetableWithGroupId(groupId: string): Promise<CreateTimetableDto>;
}
