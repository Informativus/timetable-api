import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';
import { TReplacementData } from 'src/replacement/Types/replacementData.type';

export interface IGetReplaceWithDate {
  getReplacementWithDate(
    replacementDto: GetReplacementDto,
  ): Promise<TReplacementData[]>;
}
