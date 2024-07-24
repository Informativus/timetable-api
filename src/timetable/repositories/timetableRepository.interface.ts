import { CreateTimetableDto } from '../../dto/timetable/CreateTimetable.dto';

export interface ITimetableRepository {
  getTimetableWithGroup(groupTextId: string): Promise<CreateTimetableDto[]>;

  setTimetable(
    groupTextId: string,
    timetable: CreateTimetableDto,
  ): Promise<void>;
}
