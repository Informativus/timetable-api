import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacementDto';

export interface IGetReplaceWithDate {
  getReplacementWithDate(
    replacementDto: GetReplacementDto,
  ): Promise<CreateReplacementDto[]>;
}
