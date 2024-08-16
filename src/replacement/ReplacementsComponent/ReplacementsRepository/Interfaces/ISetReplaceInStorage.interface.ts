import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { TGroupId } from 'src/group/types/groupId.type';

export interface ISetReplaceInStorage {
  setReplacementWithDate(
    group: TGroupId,
    replacement: CreateReplacementDto,
    date: string,
  ): Promise<void>;

  setReplacementInCache(
    key: string,
    replacement: CreateReplacementDto,
  ): Promise<void>;
}
