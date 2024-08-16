import {
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
    const groupId: TGroupId = await this.getGroupId(replacementsDto);

    await this.replacementRepository.setReplacementWithDate(
      groupId,
      replacements,
      replacementsDto.date,
    );
  }

  async setReplacementInCache(
    replacement: CreateReplacementDto,
    key: string,
  ): Promise<void> {
    try {
      await this.replacementRepository.setReplacementInCache(key, replacement);
    } catch (error) {
      console.log(error);
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
      throw new InternalServerErrorException('Failed to get group');
    }
  }
}
