import { Inject, InternalServerErrorException } from '@nestjs/common';
import { IRelationDatabase } from 'src/database/relationDatabase.interface';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { IReplacementRepository } from './replacementRepository.interface';
import { formatDateToSql } from 'src/utils/date.util';
import { GetReplacementDTO } from 'src/dto/replacement/getReplacement.dto';
import { GroupId } from 'src/group/types/groupId.type';
import { validateAndMapDto } from 'src/validators/validateAndMapDto.validator';

export class ReplacementRepositoryService implements IReplacementRepository {
  constructor(
    @Inject('IRelationDatabase')
    private readonly relationDatabase: IRelationDatabase,
  ) {}

  async getReplacementWithGroup(
    group: string,
  ): Promise<CreateReplacementDto[]> {
    try {
      const result = await this.relationDatabase.sendQuery({
        text: 'SELECT replacement FROM data_on_year WHERE id = $1 AND date = current_date',
        values: [group],
      });

      const replacements = result.map(
        (data: { replacement: CreateReplacementDto }) => data.replacement,
      );

      return await validateAndMapDto(replacements, CreateReplacementDto);
    } catch (error) {
      console.error('Error getting replacement: ', error);
      throw new InternalServerErrorException('Failed to get replacement');
    }
  }

  async getReplacementWithDate(
    replacementDto: GetReplacementDTO,
  ): Promise<CreateReplacementDto[]> {
    try {
      const result = await this.relationDatabase.sendQuery({
        text: 'SELECT replacement FROM data_on_year WHERE date = $1 AND id = $2',
        values: [formatDateToSql(replacementDto.date), replacementDto.group],
      });

      const replacements = result.map(
        (data: { replacement: CreateReplacementDto }) => data.replacement,
      );

      return await validateAndMapDto(replacements, CreateReplacementDto);
    } catch (error) {
      console.error('Error getting replacement with date: ', error);
      throw new InternalServerErrorException(
        'Failed to get replacement with date',
      );
    }
  }

  async setReplacement(
    group: GroupId,
    replacement: CreateReplacementDto,
  ): Promise<void> {
    try {
      await this.relationDatabase.sendQuery({
        text: 'INSERT INTO replacements (group_id, replacement) VALUES ($1, $2)',
        values: [group.group_id, JSON.stringify(replacement)],
      });
    } catch (error) {
      console.log('Error inserting replacement: ', error);
      throw new InternalServerErrorException('Failed to set replacement');
    }
  }
}
