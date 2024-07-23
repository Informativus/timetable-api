import { timetableType } from '../types/timetable.type';

export interface ITimetableRepository {
  getTimetableWithGroupId(groupId: string): Promise<timetableType>;
}
