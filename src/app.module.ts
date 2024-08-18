import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { GroupModule } from './group/group.module';
import { TimetableModule } from './timetable/timetable.module';
import { CacheModule } from './cache/cache.module';
import { AppController } from './app.controller';
import { ReplacementsModule } from './replacement/replacements.module';
import { ClientsModule } from '@nestjs/microservices';
import { replacementsGRPCOptions } from './grpcOtions/replacementsGRPC.options';
import { timetableGRPCOptions } from './grpcOtions/timetableGRPC.options';
import {
  REPLACEMENTS_PACKAGE,
  TIMETABLE_PACKAGE,
} from './config/constants/constants';
import { UpdateReplacementsListenerModule } from './updateReplacementsListener/updateReplacementsListener.module';
import { UpdateTimetableListenerModule } from './updateTimetableListener/updateTimetableListener.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    GroupModule,
    TimetableModule,
    CacheModule,
    ReplacementsModule,
    UpdateReplacementsListenerModule,
    UpdateTimetableListenerModule,
    ClientsModule.register([
      {
        name: REPLACEMENTS_PACKAGE,
        ...replacementsGRPCOptions,
      },
      {
        name: TIMETABLE_PACKAGE,
        ...timetableGRPCOptions,
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
