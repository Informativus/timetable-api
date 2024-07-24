import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { CreateTimetableDto } from '../dto/timetable/CreateTimetable.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GroupDto } from '../dto/group/group.dto';

@ApiTags('timetable')
@Controller()
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Get('/timetable')
  @ApiOkResponse({ type: CreateTimetableDto })
  @ApiOperation({ summary: 'Get timetable' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getTimetable(@Query() groupDto: GroupDto): Promise<CreateTimetableDto> {
    return this.timetableService.getTimetable(groupDto);
  }
}
