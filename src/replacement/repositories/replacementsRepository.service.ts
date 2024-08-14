import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { RELATION_DATABASE } from 'src/config/constants/constants';
import { IRelationDatabase } from 'src/database/relationDatabase.interface';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';
import { GroupId } from 'src/group/types/groupId.type';
import { formatDateToSql } from 'src/utils/date.util';
import { validateAndMapDto } from 'src/utils/validateAndMapDto.util';
import { IReplacementRepository } from './replacementsRepository.interface';

export class ReplacementsRepository implements IReplacementRepository {
  constructor(
    @Inject(RELATION_DATABASE)
    private readonly relationDatabase: IRelationDatabase,
    private readonly cacheService: CacheService<CreateReplacementDto>,
  ) {}
  async getReplacementWithGroup(
    groupTextId: string,
  ): Promise<CreateReplacementDto[]> {
    try {
      const result = await this.relationDatabase.sendQuery({
        text: 'SELECT replacement FROM data_on_year WHERE id = $1 AND date = current_date',
        values: [groupTextId],
      });

      const replacement = result.map(
        (data: { replacement: CreateReplacementDto }) => data.replacement,
      );

      return validateAndMapDto(replacement, CreateReplacementDto);
    } catch (error) {
      console.error('Error getting replacement: ', error);
      throw new InternalServerErrorException('Failed to get replacement');
    }
  }

  async getReplacementWithDate(
    replacementDto: GetReplacementDto,
  ): Promise<CreateReplacementDto[]> {
    try {
      const result = await this.relationDatabase.sendQuery({
        text: 'SELECT replacement FROM data_on_year WHERE date = $1 AND id = $2 LIMIT 1',
        values: [formatDateToSql(replacementDto.date), replacementDto.group],
      });

      const replacement = result.map(
        (data: { replacement: CreateReplacementDto }) => data.replacement,
      );

      return validateAndMapDto(replacement, CreateReplacementDto);
    } catch (error) {
      console.error('Error getting replacement with date: ', error);
      throw new InternalServerErrorException(
        'Failed to get replacement with date',
      );
    }
  }

  async setReplacementWithDate(
    group: GroupId,
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
    value: CreateReplacementDto,
  ): Promise<void> {
    try {
      await this.cacheService.set(key, value);
    } catch (error) {
      console.log('Error inserting replacement: ', error);
      throw new InternalServerErrorException('Failed to set replacement');
    }
  }
}
