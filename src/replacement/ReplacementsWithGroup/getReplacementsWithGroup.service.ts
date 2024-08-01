import { Inject, Injectable } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacementDto';
import { ensureGroupExists } from 'src/utils/group.util';
import { IReplacementRepository } from '../repositories/replacementsRepository.interface';
import { SuccessStatusDto } from 'src/dto/successStatus.dto';
import { isDataNotEmpty } from 'src/utils/isDataNotEmpty.util';
import { IGetGroupWithData } from 'src/group/Interfaces/IGetGroupWithData.interface';
import {
  GET_GROUP_WITH_DATA,
  GET_REPLACEMENTS_WITH_GROUP,
} from 'src/config/constants';

@Injectable()
export class GetReplacementsWithGroup {
  constructor(
    @Inject(GET_REPLACEMENTS_WITH_GROUP)
    private readonly replacementRepository: IReplacementRepository,
    @Inject(GET_GROUP_WITH_DATA)
    private readonly groupService: IGetGroupWithData,
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
      return replacements[0];
    }

    return {
      success: false,
    };
  }
}
