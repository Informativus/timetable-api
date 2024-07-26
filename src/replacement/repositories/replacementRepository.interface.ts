import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDTO } from 'src/dto/replacement/getReplacement.dto';
import { GroupId } from 'src/group/types/groupId.type';

export interface IReplacementRepository {
  getReplacementWithGroup(group: string): Promise<CreateReplacementDto[]>;

  getReplacementWithDate(
    replacementDto: GetReplacementDTO,
  ): Promise<CreateReplacementDto[]>;

  setReplacement(
    group: GroupId,
    replacement: CreateReplacementDto,
  ): Promise<void>;
}
