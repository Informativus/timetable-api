import { Inject, Injectable } from '@nestjs/common';
import { INoRelationDatabase } from '../database/noRelationDatabase.interface';
import {
  HASHING_SERVICE,
  NO_RELATION_DATABASE,
} from 'src/config/constants/constants';
import { IHashing } from 'src/hashing/Interfaces/hashing.interface';

@Injectable()
export class CacheService<T extends object> {
  constructor(
    @Inject(NO_RELATION_DATABASE)
    private readonly noRelationDatabase: INoRelationDatabase,
    @Inject(HASHING_SERVICE)
    private readonly hashingService: IHashing,
  ) {}

  async set(key: string, value: T): Promise<void> {
    try {
      await this.noRelationDatabase.set(
        this.hashingService.hash(key),
        JSON.stringify(value),
      );
    } catch (error) {
      console.error(error);
      throw new Error('Error saving data to cache');
    }
  }

  async get(key: string): Promise<T | null> {
    try {
      const data = await this.noRelationDatabase.get(
        this.hashingService.hash(key),
      );
      console.log(data);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(error);
      throw new Error('Error getting data from cache');
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.noRelationDatabase.delete(this.hashingService.hash(key));
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting data from cache');
    }
  }
}
