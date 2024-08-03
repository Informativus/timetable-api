import { ISetReplaceInStorage } from './Interfaces/ISetReplaceInStorage.interface';
import { IGetReplaceWithGroup } from './Interfaces/IGetReplaceWithGroup.interface';
import { IGetReplaceWithDate } from './Interfaces/IGetReplaceWithDate.interface';

export interface IReplacementRepository
  extends ISetReplaceInStorage,
    IGetReplaceWithGroup,
    IGetReplaceWithDate {}
