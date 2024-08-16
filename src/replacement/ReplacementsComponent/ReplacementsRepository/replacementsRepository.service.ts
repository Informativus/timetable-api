import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { RELATION_DATABASE } from 'src/config/constants/constants';
import { IRelationDatabase } from 'src/database/relationDatabase.interface';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';
import { TGroupId } from 'src/group/types/groupId.type';
import { TReplacementData } from '../Types/replacementData.type';
import { IReplacementRepository } from './replacementsRepository.interface';

export class ReplacementsRepository implements IReplacementRepository {
  constructor(
    @Inject(RELATION_DATABASE)
    private readonly relationDatabase: IRelationDatabase,
    private readonly cacheService: CacheService<CreateReplacementDto>,
  ) {}
  async getReplacementWithDate(
    replacementDto: GetReplacementDto,
  ): Promise<TReplacementData[]> {
    try {
      const result = await this.relationDatabase.sendQuery({
        text: 'SELECT replacement, date FROM data_on_year WHERE date = $1 AND id = $2 LIMIT 1',
        values: [replacementDto.date, replacementDto.group],
      });

      return result.map(
        (data: { date: Date; replacement: CreateReplacementDto }) => ({
          date: data.date,
          replacement: data.replacement,
        }),
      );
    } catch (error) {
      console.error('Error getting replacement with date: ', error);
      throw new InternalServerErrorException(
        'Failed to get replacement with date',
      );
    }
  }

  async setReplacementWithDate(
    group: TGroupId,
    replacement: CreateReplacementDto,
    date: string,
  ): Promise<void> {
    try {
      await this.relationDatabase.sendQuery({
        text: 'INSERT INTO replacements (group_id, replacement, replacement_date) VALUES ($1, $2, $3)',
        values: [group.group_id, JSON.stringify(replacement), date],
      });
    } catch (error) {
      console.log('Error inserting replacement: ', error);
      throw new InternalServerErrorException('Failed to set replacement');
    }
  }

  async setReplacementInCache(
    key: string,
    replacement: CreateReplacementDto,
  ): Promise<void> {
    try {
      await this.cacheService.set(key, replacement);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to set replacement in cache',
      );
    }
  }
}
