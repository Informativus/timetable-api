import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';

export interface IReplacementInserterInCache {
  setReplacementInCache(
    key: string,
    value: CreateReplacementDto,
  ): Promise<void>;
}
