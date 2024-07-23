import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { SuccessStatusDto } from '../dto/successStatus.dto';
import { GetReplacementDTO } from 'src/dto/replacement/getReplacement.dto';

export interface IReplacement {
  getReplacementsWithGroup(
    replacementsDto: GetReplacementDTO,
  ): Promise<CreateReplacementDto | SuccessStatusDto>;

  getReplacementsWithDate(
    replacementDto: GetReplacementDTO,
  ): Promise<CreateReplacementDto | SuccessStatusDto>;

  setReplacements(
    replacementsDto: GetReplacementDTO,
    replacements: CreateReplacementDto,
  ): Promise<void>;
}
