import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { ReplacementsEmptyDto } from '../dto/replacement/replacementsEmpty.dto';
import { GetReplacementDTO } from 'src/dto/replacement/getReplacement.dto';

export interface IReplacement {
  getReplacementsWithGroup(
    replacementsDto: GetReplacementDTO,
  ): Promise<CreateReplacementDto | ReplacementsEmptyDto>;

  getReplacementsWithDate(
    replacementDto: GetReplacementDTO,
  ): Promise<CreateReplacementDto | ReplacementsEmptyDto>;

  setReplacements(
    replacementsDto: GetReplacementDTO,
    replacements: CreateReplacementDto,
  ): Promise<void>;
}
