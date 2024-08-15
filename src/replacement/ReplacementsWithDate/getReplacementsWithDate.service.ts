import { Inject } from '@nestjs/common';
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

export class GetReplacementsWithDate {
  constructor(
    @Inject(GET_REPLACEMENTS_WITH_DATE)
    private readonly replacementRepository: IReplacementRepository,
    @Inject(GET_GROUP_WITH_DATA)
    private readonly groupService: IGetGroupWithData,
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
