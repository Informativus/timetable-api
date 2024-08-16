import { Inject } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import {
  GET_GROUP_WITH_DATA,
  GET_REPLACEMENTS_WITH_DATE,
} from 'src/config/constants/constants';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';
import { SuccessStatusDto } from 'src/dto/successStatus.dto';
import { IGetGroupWithData } from 'src/group/Interfaces/IGetGroupWithData.interface';
import { ensureGroupExists } from 'src/utils/group.util';
import { isDataNotEmpty } from 'src/utils/isDataNotEmpty.util';
import { IReplacementRepository } from '../repositories/replacementsRepository.interface';
import { IInserterReplacementInCache } from '../SetReplacements/IInserterRepalcementInCache.interface';
import { SetReplacements } from '../SetReplacements/setReplacementsInDb.service';
import { TReplacementData } from '../Types/replacementData.type';
import { isTodayDate } from 'src/utils/isTodayDate.util';

export class ReplacementData {
  constructor(
    @Inject(GET_REPLACEMENTS_WITH_DATE)
    private readonly replacementRepository: IReplacementRepository,
    @Inject(GET_GROUP_WITH_DATA)
    private readonly groupService: IGetGroupWithData,
    @Inject(SetReplacements)
    private readonly setReplacements: IInserterReplacementInCache,
    private readonly cacheService: CacheService<CreateReplacementDto>,
  ) {}

  async getReplacementsWithDate(
    replacementsDto: GetReplacementDto,
  ): Promise<CreateReplacementDto | SuccessStatusDto> {
    await ensureGroupExists(this.groupService, { id: replacementsDto.group });

    const cacheKey: string = `${replacementsDto.group}|${replacementsDto.date}`;
    const replacementInCache: CreateReplacementDto =
      await this.cacheService.get(cacheKey);

    if (isDataNotEmpty(replacementInCache)) {
      console.debug('Get replace from cache');
      return replacementInCache;
    }

    const replacements: TReplacementData[] =
      await this.replacementRepository.getReplacementWithDate(replacementsDto);

    if (isDataNotEmpty(replacements[0])) {
      if (isTodayDate(replacements[0].date)) {
        console.debug('Set replace in cache');
        await this.setReplacements.setReplacementInCache(
          replacements[0].replacement,
          cacheKey,
        );
      }

      return replacements[0].replacement;
    }

    return {
      success: false,
    };
  }
}
