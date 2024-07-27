import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { SuccessStatusDto } from '../dto/successStatus.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacementDto';

export interface IReplacement {
  getReplacementsWithGroup(
    replacementsDto: GetReplacementDto,
  ): Promise<CreateReplacementDto | SuccessStatusDto>;

  getReplacementsWithDate(
    replacementDto: GetReplacementDto,
  ): Promise<CreateReplacementDto | SuccessStatusDto>;

  setReplacements(
    replacementsDto: GetReplacementDto,
    replacements: CreateReplacementDto,
  ): Promise<void>;
}
