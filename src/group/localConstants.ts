import {
  GROUP_REPOSITORY,
  SET_GROUP_IN_STORAGE,
} from '../config/constants/constants';
import { GroupRepository } from './repository/groupRepository.service';
import { GroupFacade } from './groupFacade.service';

export const groupRepository = {
  provide: GROUP_REPOSITORY,
  useClass: GroupRepository,
};
export const setGroupInStorage = {
  provide: SET_GROUP_IN_STORAGE,
  useClass: GroupFacade,
};
