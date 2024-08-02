import {
  GET_GROUP_WITH_DATA,
  GET_REPLACEMENTS_WITH_DATE,
  GET_REPLACEMENTS_WITH_GROUP,
  REPLACEMENTS_REPOSITORY,
  SET_REPLACEMENTS_IN_STORAGE,
} from '../config/constants';
import { GroupFacade } from '../group/groupFacade.service';
import { ReplacementsRepository } from './repositories/replacementsRepository.service';

export const groupFacade = {
  provide: GET_GROUP_WITH_DATA,
  useExisting: GroupFacade,
};

export const replacementsRepository = {
  provide: REPLACEMENTS_REPOSITORY,
  useClass: ReplacementsRepository,
};

export const getReplacementsWithGroup = {
  provide: GET_REPLACEMENTS_WITH_GROUP,
  useClass: ReplacementsRepository,
};

export const getReplacementsWithDate = {
  provide: GET_REPLACEMENTS_WITH_DATE,
  useClass: ReplacementsRepository,
};

export const setReplacementsInStorage = {
  provide: SET_REPLACEMENTS_IN_STORAGE,
  useClass: ReplacementsRepository,
};
