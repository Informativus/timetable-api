import { GetGroupDto } from 'src/dto/group/getGroup.dto';

export interface ISetGroupInStorage {
  setGroup(groupDto: GetGroupDto): Promise<void>;
}
