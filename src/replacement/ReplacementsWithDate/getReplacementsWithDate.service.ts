import { Inject } from '@nestjs/common';
import { IReplacementRepository } from '../repositories/replacementsRepository.interface';
import { GetReplacementDto } from 'src/dto/replacement/getReplacementDto';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { SuccessStatusDto } from 'src/dto/successStatus.dto';
import { ensureGroupExists } from 'src/utils/group.util';
import { isDataNotEmpty } from 'src/utils/isDataNotEmpty.util';
import { IGroupService } from 'src/group/groupService.interface';

export class GetReplacementsWithDate {
  constructor(
    @Inject('IGetReplaceWithDate')
    private readonly replacementRepository: IReplacementRepository,
    @Inject('IGroupService') private readonly groupService: IGroupService,
  ) {}

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
}
