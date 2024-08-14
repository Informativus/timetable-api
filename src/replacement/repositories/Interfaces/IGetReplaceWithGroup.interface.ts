import { TReplacementData } from 'src/replacement/Types/replacementData.type';

export interface IGetReplaceWithGroup {
  getReplacementWithGroup(group: string): Promise<TReplacementData[]>;
}
