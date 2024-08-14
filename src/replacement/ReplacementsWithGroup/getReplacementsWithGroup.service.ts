import { Inject, Injectable } from '@nestjs/common';
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
import { IReplacementRepository } from '../repositories/replacementsRepository.interface';
import { IReplacementInserterInCache } from '../SetReplacements/IReplacementInserterInCache.interface';
import { ReplacementStorageInserter } from '../SetReplacements/replacementStorageInserter.service';

@Injectable()
export class GetReplacementsWithGroup {
  constructor(
    @Inject(GET_REPLACEMENTS_WITH_GROUP)
    private readonly replacementRepository: IReplacementRepository,
    @Inject(GET_GROUP_WITH_DATA)
    private readonly groupService: IGetGroupWithData,
    @Inject(ReplacementStorageInserter)
    private readonly replacementInCache: IReplacementInserterInCache,
    private readonly cacheService: CacheService<CreateReplacementDto>,
  ) {}

  async getReplacementsWithGroup(
    replacementsDto: GetReplacementDto,
  ): Promise<CreateReplacementDto | SuccessStatusDto> {
    await ensureGroupExists(this.groupService, { id: replacementsDto.group });

    const cacheKey = replacementsDto.group;
    const cachedReplacements: CreateReplacementDto =
      await this.cacheService.get(cacheKey);

    if (cachedReplacements) {
      return cachedReplacements;
    }

    const replacements: CreateReplacementDto[] =
      await this.replacementRepository.getReplacementWithGroup(
        replacementsDto.group,
      );

    if (isDataNotEmpty(replacements[0])) {
      await this.replacementInCache.setReplacementInCache(
        cacheKey,
        replacements[0],
      );
      return replacements[0];
    }

    return {
      success: false,
    };
  }
}
