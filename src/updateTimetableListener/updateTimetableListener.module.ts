import { Module } from '@nestjs/common';
import { UpdateTimetableListener } from './updateTimetableListener.service';
import { UpdateTimetableListenerController } from './updateTimetableListener.controller';
import { TimetableModule } from 'src/timetable/timetable.module';
import { SET_TIMETABLE_IN_STORAGE } from 'src/config/constants/constants';
import { TimetableFacade } from 'src/timetable/timetableFacade.service';
import { UpdateTimetable } from './TimetableUpdaters/updateTimetable.service';

@Module({
  imports: [TimetableModule],
  controllers: [UpdateTimetableListenerController],
  providers: [
    UpdateTimetableListener,
    UpdateTimetable,
    {
      provide: SET_TIMETABLE_IN_STORAGE,
      useExisting: TimetableFacade,
    },
  ],
})
export class UpdateTimetableListenerModule {}
