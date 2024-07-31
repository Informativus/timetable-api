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
      Number(this.config.get({ property: 'REDIS_PORT' })),
      this.config.get({ property: 'REDIS_HOST' }),
    );
  }

  async set(key: string, value: any): Promise<void> {
    console.log(`Inserted key: ${key}, inserted value: ${value}`);
    try {
      await this.redis.set(key, value);
    } catch (error) {
      console.error(error);
      throw new Error(`Redis method set returned error: ${error}`);
    }
  }

  async get(key: string): Promise<any | null> {
    try {
      return this.redis.get(key);
    } catch (error) {
      console.error(error);
      throw new Error(`Redis method get returned error: ${error}`);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.redis.del(key, (error) => {
        if (error) {
          throw new Error(`Redis method delete returned error: ${error}`);
        }
      });
    } catch (error) {
      console.error(error);
      throw new Error(`Redis method delete returned error: ${error}`);
    }
  }
}
