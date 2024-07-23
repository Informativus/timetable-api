import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { GroupModule } from './group/group.module';
import { TimetableModule } from './timetable/timetable.module';
import { ReplacementModule } from './replacement/replacement.module';
import { CacheModule } from './cash/cache.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    GroupModule,
    TimetableModule,
    ReplacementModule,
    CacheModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}