import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacementDto';
import { SuccessStatusDto } from 'src/dto/successStatus.dto';
import { IReplecementsFacade } from './IReplacementsFacade.interface';
import { GetReplacementsWithGroup } from './ReplacementsWithGroup/getReplacementsWithGroup.service';
import { GetReplacementsWithDate } from './ReplacementsWithDate/getReplacementsWithDate.service';
import { SetReplacements } from './SetReplacements/setReplacementsInDb.service';
import { Inject } from '@nestjs/common';

export class ReplacementsFacade implements IReplecementsFacade {
  constructor(
    @Inject()
    private readonly getReplacementsGroup: GetReplacementsWithGroup,
    @Inject()
    private readonly getReplacementsDate: GetReplacementsWithDate,
    @Inject()
    private readonly setReplacementsInDatabase: SetReplacements,
  ) {}

  getReplacementsWithGroup(
    replacementsDto: GetReplacementDto,
  ): Promise<CreateReplacementDto | SuccessStatusDto> {
    return this.getReplacementsGroup.getReplacementsWithGroup(replacementsDto);
  }

  getReplacementsWithDate(
    replacementsDto: GetReplacementDto,
  ): Promise<CreateReplacementDto | SuccessStatusDto> {
    return this.getReplacementsDate.getReplacementsWithDate(replacementsDto);
  }

  setReplacements(
    replacementsDto: GetReplacementDto,
    replacements: CreateReplacementDto,
  ): Promise<void> {
    return this.setReplacementsInDatabase.setReplacements(
      replacementsDto,
      replacements,
    );
  }
}
