import { GroupDto } from 'src/dto/group/group.dto';

export interface ICheckGroupOnExists {
  isExistsGroup(groupData: GroupDto): Promise<boolean>;
}
