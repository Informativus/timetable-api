import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';

export interface IGetReplaceWithGroup {
  getReplacementWithGroup(group: string): Promise<CreateReplacementDto[]>;

  getLastReplacementsUpdate(): Promise<{ replacement_date: string }[]>;
}
