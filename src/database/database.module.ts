import { Module } from '@nestjs/common';
import { PostgresDatabaseService } from './postgres-database/postgresDatabase.service';
import { RedisDatabaseService } from './redis-database/redis-database.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [PostgresDatabaseService, RedisDatabaseService],
  exports: [PostgresDatabaseService, RedisDatabaseService],
})
export class DatabaseModule {}
