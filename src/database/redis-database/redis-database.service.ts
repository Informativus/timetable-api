import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '../../config/config.service';
import { INoRelationDatabase } from '../noRelationDatabase.interface';

@Injectable()
export class RedisDatabaseService implements INoRelationDatabase {
  private redis: Redis;
  private config: ConfigService;

  constructor() {
    this.config = new ConfigService();
    this.redis = new Redis(
      <number>(<any>this.config.get({ property: 'REDIS_PORT' })),
      this.config.get({ property: 'REDIS_HOST' }),
    );
  }
  async set(key: string, value: any): Promise<void> {
    await this.redis.set(key, value, (error) => {
      if (error) {
        throw new Error(`Redis method set returned error: ${error}`);
      }
    });
  }
  async get(key: string): Promise<any> {
    return this.redis.get(key, (error, res) => {
      if (error) {
        throw new Error(`Redis method get returned error: ${error}`);
      }
      return res;
    });
  }
  async delete(key: string): Promise<void> {
    await this.redis.del(key, (error) => {
      if (error) {
        throw new Error(`Redis method delete returned error: ${error}`);
      }
    });
  }
}
