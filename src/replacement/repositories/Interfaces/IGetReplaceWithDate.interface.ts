import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';

export interface IGetReplaceWithDate {
  getReplacementWithDate(
    replacementDto: GetReplacementDto,
  ): Promise<CreateReplacementDto[]>;
}
