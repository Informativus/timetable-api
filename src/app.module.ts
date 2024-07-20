import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { GroupModule } from './group/group.module';
import { TimetableModule } from './timetable/timetable.module';

@Module({
  imports: [DatabaseModule, ConfigModule, GroupModule, TimetableModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
