import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacementDto';
import { SuccessStatusDto } from 'src/dto/successStatus.dto';
import { IReplecementsFacade } from './IReplacementsFacade.interface';
import { GetReplacementsWithGroup } from './ReplacementsWithGroup/getReplacementsWithGroup.service';
import { GetReplacementsWithDate } from './ReplacementsWithDate/getReplacementsWithDate.service';
import { SetReplacements } from './SetReplacements/setReplacementsInDb.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReplacementsFacade implements IReplecementsFacade {
  constructor(
    private readonly getReplacementsGroup: GetReplacementsWithGroup,
    private readonly getReplacementsDate: GetReplacementsWithDate,
    private readonly setReplacementsInDatabase: SetReplacements,
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

  async setReplacements(
    replacementsDto: GetReplacementDto,
    replacements: CreateReplacementDto,
  ): Promise<void> {
    return await this.setReplacementsInDatabase.setReplacements(
      replacementsDto,
      replacements,
    );
  }
}
