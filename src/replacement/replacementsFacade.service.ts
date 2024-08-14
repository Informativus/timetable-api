import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';
import { SuccessStatusDto } from 'src/dto/successStatus.dto';
import { IReplecementsFacade } from './IReplacementsFacade.interface';
import { GetReplacementsWithGroup } from './ReplacementsWithGroup/getReplacementsWithGroup.service';
import { GetReplacementsWithDate } from './ReplacementsWithDate/getReplacementsWithDate.service';
import { ReplacementStorageInserter } from './SetReplacements/replacementStorageInserter.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReplacementsFacade implements IReplecementsFacade {
  constructor(
    private readonly getReplacementsGroup: GetReplacementsWithGroup,
    private readonly getReplacementsDate: GetReplacementsWithDate,
    private readonly setReplacementsInDatabase: ReplacementStorageInserter,
  ) {}
  async getReplacementsWithGroup(
    replacementsDto: GetReplacementDto,
  ): Promise<CreateReplacementDto | SuccessStatusDto> {
    return await this.getReplacementsGroup.getReplacementsWithGroup(
      replacementsDto,
    );
  }

  async getReplacementsWithDate(
    replacementsDto: GetReplacementDto,
  ): Promise<CreateReplacementDto | SuccessStatusDto> {
    return await this.getReplacementsDate.getReplacementsWithDate(
      replacementsDto,
    );
  }

  async setReplacementsWithDate(
    replacementsDto: GetReplacementDto,
    replacements: CreateReplacementDto,
  ): Promise<void> {
    return await this.setReplacementsInDatabase.setReplacementsWithDate(
      replacementsDto,
      replacements,
    );
  }
}
