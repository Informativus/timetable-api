import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { GroupModule } from './group/group.module';
import { TimetableModule } from './timetable/timetable.module';
import { CacheModule } from './cache/cache.module';
import { AppController } from './app.controller';
import { ReplacementsModule } from './replacement/replacements.module';
import { ReplacementsWithDateModule } from './replacement/ReplacementsWithDate/replacementsWithDate.module';
import { ReplacementsWithGroupModule } from './replacement/ReplacementsWithGroup/replacementsWithGroup.module';
import { ReplacementsRepositoryModule } from './replacement/repositories/replacementsRepository.module';
import { SetReplacementsModule } from './replacement/SetReplacements/setReplacements.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    GroupModule,
    TimetableModule,
    CacheModule,
    ReplacementsModule,
    ReplacementsRepositoryModule,
    ReplacementsWithDateModule,
    ReplacementsWithGroupModule,
    SetReplacementsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
