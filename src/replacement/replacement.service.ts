import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CacheService } from 'src/cash/cache.service';
import { IReplacement } from './replacement.interface';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { IReplacementRepository } from './repositories/replacementRepository.interface';
import { SuccessStatusDto } from '../dto/successStatus.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacementDto';
import { IGroupService } from 'src/group/groupService.interface';
import { GetGroupDto } from '../dto/group/getGroup.dto';
import { ValidateAndMapDto } from 'src/validators/validateAndMapDtoDecorator.validator';

@Injectable()
export class ReplacementService implements IReplacement {
  constructor(
    @Inject('IReplacementRepository')
    private readonly replacementRepository: IReplacementRepository,
    @Inject('IGroupService')
    private readonly groupService: IGroupService,
    private readonly cacheService: CacheService<CreateReplacementDto>,
  ) {}

  async getReplacementsWithGroup(
    replacementsDto: GetReplacementDto,
  ): Promise<CreateReplacementDto | SuccessStatusDto> {
    if (
      !(await this.groupService.isExistsGroup({
        id: replacementsDto.group,
      }))
    ) {
      throw new BadRequestException('Group not found');
    }

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
    replacementDto: GetReplacementDto,
  ): Promise<CreateReplacementDto | SuccessStatusDto> {
    const replacements: CreateReplacementDto[] =
      await this.replacementRepository.getReplacementWithDate(replacementDto);

    if (replacements[0]) {
      return replacements[0];
    }

    return {
      success: false,
    };
  }

  @ValidateAndMapDto(GetReplacementDto, CreateReplacementDto)
  async setReplacements(
    replacementsDto: GetReplacementDto,
    replacements: CreateReplacementDto,
  ): Promise<void> {
    const group: GetGroupDto = await this.groupService.getGroupWithId({
      id: replacementsDto.group,
    });
    if (!group) {
      throw new BadRequestException('Group not found');
    }
    const cacheKey: string = replacementsDto.group;

    await this.cacheService.set(cacheKey, replacements);

    await this.replacementRepository.setReplacement(
      {
        group_id: group.group_id,
      },
      replacements,
    );
  }
}
