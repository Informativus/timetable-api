import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';
import { SuccessStatusDto } from 'src/dto/successStatus.dto';
import { IReplacementsFacade } from './IReplacementsFacade.interface';
import { ReplacementData } from './ReplacementData/replacementData.service';
import { SetReplacements } from './SetReplacements/setReplacementsInDb.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReplacementsFacade implements IReplacementsFacade {
  constructor(
    private readonly getReplacementsDate: ReplacementData,
    private readonly setReplacementsInDatabase: SetReplacements,
  ) {}
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
