import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GroupId } from 'src/group/types/groupId.type';

export interface ISetReplaceInStorage {
  setReplacementWithDate(
    group: GroupId,
    replacement: CreateReplacementDto,
    date: string,
  ): Promise<void>;
}
