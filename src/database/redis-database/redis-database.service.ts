import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
      await this.redis.set(key, value, 'EX', 43200);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Redis method set returned error');
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      console.log(`Retrieved key: ${key}`);
      return this.redis.get(key);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Redis method get returned error');
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Redis method del returned error');
    }
  }
}
