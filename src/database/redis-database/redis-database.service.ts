import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class RedisDatabaseService {
  private redis: Redis;
  private config: ConfigService;

  constructor() {
    this.config = new ConfigService();
    this.redis = new Redis({
      host: this.config.get({ property: 'REDIS_HOST' }),
      port: this.config.get({ property: 'REDIS_PORT' }),
      username: this.config.get({ property: 'REDIS_USERNAME' }),
    });
  }
}
