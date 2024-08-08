import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { replacementsDate } from 'src/replacement/Types/replacementsDate.type';

export interface IGetReplaceWithGroup {
  getReplacementWithGroup(group: string): Promise<CreateReplacementDto[]>;

  getLastReplacementsUpdate(): Promise<replacementsDate[]>;
}
