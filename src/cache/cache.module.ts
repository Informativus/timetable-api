import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { RedisDatabaseService } from 'src/database/redis-database/redis-database.service';
import { DatabaseModule } from '../database/database.module';
import { HashingModule } from 'src/hashing/hashing.module';
import { HashingService } from 'src/hashing/hashing.service';
import {
  HASHING_SERVICE,
  NO_RELATION_DATABASE,
} from 'src/config/constants/constants';

@Module({
  imports: [DatabaseModule, HashingModule],
  providers: [
    CacheService,
    { provide: NO_RELATION_DATABASE, useClass: RedisDatabaseService },
    { provide: HASHING_SERVICE, useClass: HashingService },
  ],
  exports: [CacheService],
})
export class CacheModule {}
