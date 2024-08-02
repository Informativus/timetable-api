import { CacheService } from 'src/cache/cache.service';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacementDto';
import { GroupId } from 'src/group/types/groupId.type';
import { ValidateAndMapDto } from 'src/validators/validateAndMapDtoDecorator.validator';
import { IReplacementRepository } from '../repositories/replacementsRepository.interface';
import { Inject, Injectable } from '@nestjs/common';
import {
  GET_GROUP_WITH_DATA,
  SET_REPLACEMENTS_IN_STORAGE,
} from 'src/config/constants/constants';
import { IGetGroupWithData } from 'src/group/Interfaces/IGetGroupWithData.interface';

@Injectable()
export class SetReplacements {
  constructor(
    @Inject(SET_REPLACEMENTS_IN_STORAGE)
    private readonly replacementRepository: IReplacementRepository,
    @Inject(GET_GROUP_WITH_DATA)
    private readonly groupService: IGetGroupWithData,
    private readonly cacheService: CacheService<CreateReplacementDto>,
  ) {}

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
    } catch (error) {}

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
