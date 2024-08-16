import { ISetReplaceInStorage } from './Interfaces/ISetReplaceInStorage.interface';
import { IGetReplaceWithDate } from './Interfaces/IGetReplaceWithDate.interface';

export interface IReplacementRepository
  extends ISetReplaceInStorage,
    IGetReplaceWithDate {}
