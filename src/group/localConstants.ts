import {
  GET_ALL_GROUPS,
  GET_GROUP_WITH_DATA,
  GROUP_REPOSITORY,
  SET_GROUP_IN_STORAGE,
} from '../config/constants';
import { GroupRepository } from './repository/groupRepository.service';
import { GroupFacade } from './groupFacade.service';

export const groupRepository = {
  provide: GROUP_REPOSITORY,
  useClass: GroupRepository,
};
export const getGroupWithData = {
  provide: GET_GROUP_WITH_DATA,
  useClass: GroupFacade,
};
export const getAllGroups = { provide: GET_ALL_GROUPS, useClass: GroupFacade };
export const setGroupInStorage = {
  provide: SET_GROUP_IN_STORAGE,
  useClass: GroupFacade,
};
