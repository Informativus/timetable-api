import { Inject, Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { CacheService } from 'src/cache/cache.service';
import {
  GET_GROUP_WITH_DATA,
  GET_REPLACEMENTS_WITH_GROUP,
} from 'src/config/constants/constants';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';
import { SuccessStatusDto } from 'src/dto/successStatus.dto';
import { IGetGroupWithData } from 'src/group/Interfaces/IGetGroupWithData.interface';
import { ensureGroupExists } from 'src/utils/group.util';
import { isDataNotEmpty } from 'src/utils/isDataNotEmpty.util';
import { isSameDate } from 'src/utils/isSamedate.util';
import { IReplacementRepository } from '../repositories/replacementsRepository.interface';
import { IInserterReplacementInCache } from '../SetReplacements/IInserterRepalcementInCache.interface';
import { SetReplacements } from '../SetReplacements/setReplacementsInDb.service';
import { TReplacementData } from '../Types/replacementData.type';

@Injectable()
export class GetReplacementsWithGroup {
  constructor(
    @Inject(GET_REPLACEMENTS_WITH_GROUP)
    private readonly replacementRepository: IReplacementRepository,
    @Inject(GET_GROUP_WITH_DATA)
    private readonly groupService: IGetGroupWithData,
    @Inject(SetReplacements)
    private readonly setReplacements: IInserterReplacementInCache,
    private readonly cacheService: CacheService<CreateReplacementDto>,
  ) {}

  async getReplacementsWithGroup(
    replacementsDto: GetReplacementDto,
  ): Promise<CreateReplacementDto | SuccessStatusDto> {
    await ensureGroupExists(this.groupService, { id: replacementsDto.group });

    const currentDate: string = format(new Date(), 'yyyy-MM-dd');

    const cacheKey: string = `${replacementsDto.group}|${currentDate}`;
    const replacementInCache: CreateReplacementDto =
      await this.cacheService.get(cacheKey);

    if (isDataNotEmpty(replacementInCache)) {
      console.debug('Get replace from cache');
      return replacementInCache;
    }

    const replacements: TReplacementData[] =
      await this.replacementRepository.getReplacementWithGroup(
        replacementsDto.group,
      );

    if (isDataNotEmpty(replacements[0])) {
      if (isSameDate(replacements[0].date)) {
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
