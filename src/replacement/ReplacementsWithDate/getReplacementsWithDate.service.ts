import { Inject } from '@nestjs/common';
import { IReplacementRepository } from '../repositories/replacementsRepository.interface';
import { GetReplacementDto } from 'src/dto/replacement/getReplacementDto';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { SuccessStatusDto } from 'src/dto/successStatus.dto';
import { ensureGroupExists } from 'src/utils/group.util';
import { isDataNotEmpty } from 'src/utils/isDataNotEmpty.util';
import {
  GET_GROUP_WITH_DATA,
  GET_REPLACEMENTS_WITH_DATE,
} from 'src/config/constants/constants';
import { IGetGroupWithData } from 'src/group/Interfaces/IGetGroupWithData.interface';

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
