import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { timetableType } from './types/timetable.type';
import { TimetableDto } from 'src/dto/timetable.dto';

@Controller('timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Get('/group_timetable')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getTimetable(@Query() groupData: TimetableDto): Promise<timetableType> {
    return this.timetableService.getTimetable(groupData);
  }
}
