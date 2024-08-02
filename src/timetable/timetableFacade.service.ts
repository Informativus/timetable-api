import { Injectable } from '@nestjs/common';
import { GetTimetableWithData } from './timetableData/getTimetableWithData.service';
import { GroupDto } from 'src/dto/group/group.dto';
import { CreateTimetableDto } from 'src/dto/timetable/CreateTimetable.dto';
import { SetTimetableInDb } from './timetableStorage/setTimetableInDb.service';

@Injectable()
export class TimetableFacade {
  constructor(
    private readonly timetableWithData: GetTimetableWithData,
    private readonly TimetableInDb: SetTimetableInDb,
  ) {}

  async getTimetable(groupDto: GroupDto): Promise<CreateTimetableDto> {
    return await this.timetableWithData.getTimetable(groupDto);
  }

  async setTimetableInDb(groupDto: GroupDto, timetable: CreateTimetableDto) {
    return await this.TimetableInDb.setTimetable(groupDto, timetable);
  }
}
