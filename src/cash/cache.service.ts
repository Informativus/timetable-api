import { Inject, Injectable } from '@nestjs/common';
import { INoRelationDatabase } from '../database/noRelationDatabase.interface';

@Injectable()
export class CacheService<T> {
  constructor(
    @Inject('INoRelationDatabase')
    private readonly noRelationDatabase: INoRelationDatabase,
  ) {}

  async set(key: string, value: T): Promise<void> {
    try {
      await this.noRelationDatabase.set(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
      throw new Error('Error saving data to cache');
    }
  }
  async get(key: string): Promise<T | null> {
    try {
      const data = await this.noRelationDatabase.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(error);
      throw new Error('Error getting data from cache');
    }
  }
  async delete(key: string): Promise<void> {
    try {
      await this.noRelationDatabase.delete(key);
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting data from cache');
    }
  }
}
