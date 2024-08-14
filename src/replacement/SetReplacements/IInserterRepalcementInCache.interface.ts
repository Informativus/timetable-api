import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';

export interface IInserterReplacementInCache {
  setReplacementInCache(
    replacement: CreateReplacementDto,
    key: string,
  ): Promise<void>;
}
