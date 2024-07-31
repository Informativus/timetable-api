import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacementDto';
import { GroupId } from 'src/group/types/groupId.type';
import { ISetReplaceInStorage } from './Interfaces/ISetReplaceInStorage.interface';
import { IGetReplaceWithGroup } from './Interfaces/IGetReplacWithGroup.interface';
import { IGetReplaceWithDate } from './Interfaces/IGetReplaceWithDate.interface';

export interface IReplacementRepository
  extends ISetReplaceInStorage,
    IGetReplaceWithGroup,
    IGetReplaceWithDate {
  getReplacementWithGroup(group: string): Promise<CreateReplacementDto[]>;

  getReplacementWithDate(
    replacementDto: GetReplacementDto,
  ): Promise<CreateReplacementDto[]>;

  setReplacement(
    group: GroupId,
    replacement: CreateReplacementDto,
  ): Promise<void>;
}
