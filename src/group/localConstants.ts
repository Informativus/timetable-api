import {
  CHECK_GROUP_DATA,
  GROUP_REPOSITORY,
  SET_GROUP_IN_STORAGE,
} from '../config/constants/constants';
import { GroupFacade } from './groupFacade.service';
import { GroupRepository } from './repository/groupRepository.service';

export const groupRepository = {
  provide: GROUP_REPOSITORY,
  useClass: GroupRepository,
};

export const setGroupInStorage = {
  provide: SET_GROUP_IN_STORAGE,
  useClass: GroupFacade,
};

export const checkGroupData = {
  provide: CHECK_GROUP_DATA,
  useClass: GroupFacade,
};
