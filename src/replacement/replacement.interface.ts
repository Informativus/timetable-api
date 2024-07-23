import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { ReplacementsIsEmty } from './types/replacementsIsEmty.type';
import { GetReplacementDTO } from 'src/dto/replacement/getReplacement.dto';

export interface IReplacement {
  getReplacementsWithGroup(
    replacementsDto: GetReplacementDTO,
  ): Promise<CreateReplacementDto | ReplacementsIsEmty>;
  getReplacementsWithDate(
    replacementDto: GetReplacementDTO,
  ): Promise<CreateReplacementDto | ReplacementsIsEmty>;
  setReplacements(
    replacementsDto: GetReplacementDTO,
    replacements: CreateReplacementDto,
  ): Promise<void>;
}
