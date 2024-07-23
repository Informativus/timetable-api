import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { CreateTimetableDto } from '../dto/timetable/CreateTimetable.dto';
import { TimetableDto } from 'src/dto/timetable/timetable.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('timetable')
@Controller('timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Get('/group_timetable')
  @ApiOkResponse({ type: CreateTimetableDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getTimetable(
    @Query() groupData: TimetableDto,
  ): Promise<CreateTimetableDto> {
    return this.timetableService.getTimetable(groupData);
  }
}
