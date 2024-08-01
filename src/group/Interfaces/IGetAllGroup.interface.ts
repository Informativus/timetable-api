import { InfoAllGroupDto } from 'src/dto/group/infoAllGroup.dto';

export interface IGetAllGroups {
  getAllGroups(): Promise<InfoAllGroupDto>;
}
