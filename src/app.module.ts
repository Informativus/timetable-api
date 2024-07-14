import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [DatabaseModule, ConfigModule, GroupModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
