import { Module } from '@nestjs/common';
import { PostgresDatabaseService } from './postgres-database/postgres-database.service';
import { RedisDatabaseService } from './redis-database/redis-database.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [RedisDatabaseService, PostgresDatabaseService],
})
export class DatabaseModule {}
