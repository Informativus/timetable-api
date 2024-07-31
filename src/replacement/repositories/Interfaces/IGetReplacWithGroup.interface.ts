import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';

export interface IGetReplaceWithGroup {
  getReplacementWithGroup(group: string): Promise<CreateReplacementDto[]>;
}
