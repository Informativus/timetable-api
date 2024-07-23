import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDTO } from 'src/dto/replacement/getReplacement.dto';

export interface IReplacementRepository {
  getReplacementWithGroup(group: string): Promise<CreateReplacementDto[]>;

  getReplacementWithDate(
    replacementDto: GetReplacementDTO,
  ): Promise<CreateReplacementDto[]>;

  setReplacement(
    group: string,
    replacement: CreateReplacementDto,
  ): Promise<void>;
}
