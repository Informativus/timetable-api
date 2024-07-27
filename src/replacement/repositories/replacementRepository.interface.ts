import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacementDto';
import { GroupId } from 'src/group/types/groupId.type';

export interface IReplacementRepository {
  getReplacementWithGroup(group: string): Promise<CreateReplacementDto[]>;

  getReplacementWithDate(
    replacementDto: GetReplacementDto,
  ): Promise<CreateReplacementDto[]>;

  setReplacement(
    group: GroupId,
    replacement: CreateReplacementDto,
  ): Promise<void>;
}
