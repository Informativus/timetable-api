import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';

export interface IReplacement {
  getReplacements(): Promise<CreateReplacementDto>;
  setReplacements(replacements: CreateReplacementDto): Promise<void>;
}
