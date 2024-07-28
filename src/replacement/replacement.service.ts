import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CacheService } from 'src/cash/cache.service';
import { IReplacement } from './replacement.interface';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { IReplacementRepository } from './repositories/replacementRepository.interface';
import { SuccessStatusDto } from '../dto/successStatus.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacementDto';
import { IGroupService } from 'src/group/groupService.interface';
import { GroupId } from 'src/group/types/groupId.type';
import { ValidateAndMapDto } from 'src/validators/validateAndMapDtoDecorator.validator';
import { isDataNotEmpty } from 'src/utils/isDataNotEmpty.util';
import { ensureGroupExists } from 'src/utils/group.util';

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

  async getReplacementsWithDate(
    replacementsDto: GetReplacementDto,
  ): Promise<CreateReplacementDto | SuccessStatusDto> {
    await ensureGroupExists(this.groupService, { id: replacementsDto.group });

    const replacements: CreateReplacementDto[] =
      await this.replacementRepository.getReplacementWithDate(replacementsDto);

    if (isDataNotEmpty(replacements[0])) {
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
    let group: GroupId;
    try {
      group = <GroupId>await this.groupService.getGroupWithId({
        id: replacementsDto.group,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed get group from group service',
      );
    }
    console.log(group);

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
