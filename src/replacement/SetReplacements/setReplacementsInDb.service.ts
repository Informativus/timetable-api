import { CacheService } from 'src/cache/cache.service';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacementDto';
import { IGroupService } from 'src/group/groupService.interface';
import { GroupId } from 'src/group/types/groupId.type';
import { ValidateAndMapDto } from 'src/validators/validateAndMapDtoDecorator.validator';
import { IReplacementRepository } from '../repositories/replacementsRepository.interface';
import { Inject } from '@nestjs/common';

export class SetReplacements {
  constructor(
    @Inject('IReplacementRepository')
    private readonly replacementRepository: IReplacementRepository,
    @Inject('IGroupService')
    private readonly groupService: IGroupService,
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
