import { Module } from '@nestjs/common';
import { UpdateTimetableListener } from './updateTimetableListener.service';
import { UpdateTimetableListenerController } from './updateTimetableListener.controller';
import { TimetableModule } from 'src/timetable/timetable.module';
import {
  CHECK_GROUP_DATA,
  SET_GROUP_IN_STORAGE,
  SET_TIMETABLE_IN_STORAGE,
} from 'src/config/constants/constants';
import { TimetableFacade } from 'src/timetable/timetableFacade.service';
import { UpdateTimetable } from './TimetableUpdaters/updateTimetable.service';
import { LessonCreator } from './TimetableUpdaters/Lessons/lessonCreator.service';
import { WeekCreator } from './TimetableUpdaters/WeekTimetable/weekTimetable.service';
import { GroupFacade } from 'src/group/groupFacade.service';
import { GroupModule } from 'src/group/group.module';

@Module({
  imports: [TimetableModule, GroupModule],
  controllers: [UpdateTimetableListenerController],
  providers: [
    UpdateTimetableListener,
    UpdateTimetable,
    LessonCreator,
    WeekCreator,
    {
      provide: SET_TIMETABLE_IN_STORAGE,
      useExisting: TimetableFacade,
    },
    {
      provide: CHECK_GROUP_DATA,
      useExisting: GroupFacade,
    },
    {
      provide: SET_GROUP_IN_STORAGE,
      useExisting: GroupFacade,
    },
  ],
})
export class UpdateTimetableListenerModule {}
