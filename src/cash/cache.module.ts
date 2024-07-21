import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { RedisDatabaseService } from 'src/database/redis-database/redis-database.service';

@Module({
  providers: [
    CacheService,
    { provide: 'INoRelationDatabase', useClass: RedisDatabaseService },
  ],
  exports: [CacheService],
})
export class CacheModule {}
