import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GroupId } from 'src/group/types/groupId.type';

export interface ISetReplaceInStorage {
  setReplacement(
    group: GroupId,
    replacement: CreateReplacementDto,
  ): Promise<void>;
}
