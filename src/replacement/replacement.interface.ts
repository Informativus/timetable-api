import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { ReplacementsIsEmty } from './types/replacementsIsEmty.type';
import { GetReplacementDTO } from 'src/dto/replacement/getReplacement.dto';

export interface IReplacement {
  getReplacements(
    replacementsDto: GetReplacementDTO,
  ): Promise<CreateReplacementDto | ReplacementsIsEmty>;
  setReplacements(replacements: CreateReplacementDto): Promise<void>;
}
