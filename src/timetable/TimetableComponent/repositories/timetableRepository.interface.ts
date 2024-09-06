import { CreateTimetableDto } from '../../../dto/timetable/CreateTimetable.dto';
import { TGroupId } from 'src/group/types/groupId.type';

export interface ITimetableRepository {
  getTimetableWithGroup(groupTextId: string): Promise<CreateTimetableDto[]>;

  setTimetable(
    groupTextId: TGroupId,
    timetable: CreateTimetableDto,
  ): Promise<void>;
}
