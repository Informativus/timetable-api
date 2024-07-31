import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacementDto';
import { SuccessStatusDto } from 'src/dto/successStatus.dto';

export interface IReplecementsFacade {
  getReplacementsWithGroup(
    replacementsDto: GetReplacementDto,
  ): Promise<CreateReplacementDto | SuccessStatusDto>;
  getReplacementsWithDate(
    replacementsDto: GetReplacementDto,
  ): Promise<CreateReplacementDto | SuccessStatusDto>;
  setReplacements(
    replacementsDto: GetReplacementDto,
    replacements: CreateReplacementDto,
  ): Promise<void>;
}
