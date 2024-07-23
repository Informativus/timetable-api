import { Inject, Injectable } from '@nestjs/common';
import { CacheService } from 'src/cash/cache.service';
import { IReplacement } from './replacement.interface';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { IReplacementRepository } from './repositories/replacementRepository.interface';
import { ReplacementsIsEmty } from './types/replacementsIsEmty.type';
import { GetReplacementDTO } from 'src/dto/replacement/getReplacement.dto';

@Injectable()
export class ReplacementService implements IReplacement {
  constructor(
    @Inject('IReplacementRepository')
    private readonly replacementRepository: IReplacementRepository,
    private readonly cacheService: CacheService<CreateReplacementDto>,
  ) {}

  async getReplacementsWithGroup(
    replacementsDto: GetReplacementDTO,
  ): Promise<CreateReplacementDto | ReplacementsIsEmty> {
    const cacheKey = replacementsDto.group;
    const cachedReplacements = await this.cacheService.get(cacheKey);

    if (cachedReplacements) {
      return cachedReplacements;
    }

    const replacements: CreateReplacementDto[] =
      await this.replacementRepository.getReplacementWithGroup(
        replacementsDto.group,
      );

    if (replacements[0]) {
      return replacements[0];
    }

    return {
      success: false,
    };
  }

  async getReplacementsWithDate(
    replacementDto: GetReplacementDTO,
  ): Promise<CreateReplacementDto | ReplacementsIsEmty> {
    const replacements: CreateReplacementDto[] =
      await this.replacementRepository.getReplacementWithDate(replacementDto);

    if (replacements[0]) {
      return replacements[0];
    }

    return {
      success: false,
    };
  }

  async setReplacements(
    replacementsDto: GetReplacementDTO,
    replacements: CreateReplacementDto,
  ): Promise<void> {
    const cacheKey = replacementsDto.group;
    await this.cacheService.set(cacheKey, replacements);

    await this.replacementRepository.setReplacement(
      replacementsDto.group,
      replacements,
    );
  }
}
