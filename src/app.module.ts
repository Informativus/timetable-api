import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { GroupModule } from './group/group.module';
import { TimetableModule } from './timetable/timetable.module';
import { CacheModule } from './cache/cache.module';
import { AppController } from './app.controller';
import { ReplacementsModule } from './replacement/replacements.module';
import { ReplacementsUpdateListenerModule } from './replacements-update-listener/replacements-update-listener.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    GroupModule,
    TimetableModule,
    CacheModule,
    ReplacementsModule,
    ReplacementsUpdateListenerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
