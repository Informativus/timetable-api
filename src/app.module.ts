import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { GroupModule } from './group/group.module';
import { TimetableModule } from './timetable/timetable.module';
import { CacheModule } from './cache/cache.module';
import { AppController } from './app.controller';
import { ReplacementsModule } from './replacement/replacements.module';
import { ClientsModule } from '@nestjs/microservices';
import { grpcOptions } from './grpc.options';
import { REPLACEMENTS_PACKAGE } from './config/constants/constants';
import { UpdateReplacementsListenerModule } from './updateReplacementsListener/UpdateReplacementsListener.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    GroupModule,
    TimetableModule,
    CacheModule,
    ReplacementsModule,
    UpdateReplacementsListenerModule,
    ClientsModule.register([
      {
        name: REPLACEMENTS_PACKAGE,
        ...grpcOptions,
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
