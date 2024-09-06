import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  GET_GROUP_WITH_DATA,
  SET_REPLACEMENTS_IN_STORAGE,
} from 'src/config/constants/constants';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';
import { IGetGroupWithData } from 'src/group/Interfaces/IGetGroupWithData.interface';
import { TGroupId } from 'src/group/types/groupId.type';
import { ValidateAndMapDto } from 'src/validators/validateAndMapHttpDecorator.validator';
import { IReplacementRepository } from '../ReplacementsRepository/replacementsRepository.interface';
import { IInserterReplacementInCache } from './InserterReplacementInCache.interface';
import { ValidateDto } from 'src/validators/ValidateDto.validator';

@Injectable()
export class ReplacementPersistenceLayer
  implements IInserterReplacementInCache
{
  constructor(
    @Inject(SET_REPLACEMENTS_IN_STORAGE)
    private readonly replacementRepository: IReplacementRepository,
    @Inject(GET_GROUP_WITH_DATA)
    private readonly groupService: IGetGroupWithData,
  ) {}

  @ValidateAndMapDto(GetReplacementDto, CreateReplacementDto)
  async setReplacementsWithDate(
    replacementsDto: GetReplacementDto,
    replacements: CreateReplacementDto,
  ): Promise<void> {
    try {
      const groupId: TGroupId = await this.getGroupId(replacementsDto);

      await this.replacementRepository.setReplacementWithDate(
        groupId,
        replacements,
        replacementsDto.date,
      );
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async setReplacementInCache(
    @ValidateDto(CreateReplacementDto) replacement: CreateReplacementDto,
    key: string,
  ): Promise<void> {
    try {
      await this.replacementRepository.setReplacementInCache(key, replacement);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Failed to set replacement in cache',
      );
    }
  }

  private async getGroupId(
    replacementsDto: GetReplacementDto,
  ): Promise<TGroupId> {
    try {
      return (await this.groupService.getGroupWithId({
        id: replacementsDto.group,
      })) as TGroupId;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to get group');
    }
  }

  private handleError(error: any): void {
    // Here you can handle or log different types of errors if needed
    if (
      error instanceof BadRequestException ||
      error instanceof InternalServerErrorException
    ) {
      throw error;
    } else {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
