import { Injectable } from '@nestjs/common';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { UpdateTimetableDto } from 'src/dto/timetable/UpdateTimetable/UpdateTimetable.dto';
import { ValidateAndMapDtoGrpc } from 'src/validators/validateAndMapRPCDecorator.validator';
import { UpdateTimetable } from './TimetableUpdaters/updateTimetable.service';

@Injectable()
export class UpdateTimetableListener {
  constructor(private readonly updaterTimetable: UpdateTimetable) {}

  @ValidateAndMapDtoGrpc(UpdateTimetableDto)
  async updateTimetable(
    updateTimetableDto: UpdateTimetableDto,
  ): Promise<Empty> {
    return this.updaterTimetable.updateTimetable(updateTimetableDto);
  }
}
