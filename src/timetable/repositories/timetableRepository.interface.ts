import { CreateTimetableDto } from '../../dto/timetable/CreateTimetable.dto';
import { GroupId } from 'src/group/types/groupId.type';

export interface ITimetableRepository {
  getTimetableWithGroup(groupTextId: string): Promise<CreateTimetableDto[]>;

  setTimetable(
    groupTextId: GroupId,
    timetable: CreateTimetableDto,
  ): Promise<void>;
}
