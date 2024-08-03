import {
  GET_REPLACEMENTS_WITH_DATE,
  GET_REPLACEMENTS_WITH_GROUP,
  REPLACEMENTS_REPOSITORY,
  SET_REPLACEMENTS_IN_STORAGE,
} from '../config/constants/constants';
import { ReplacementsRepository } from './repositories/replacementsRepository.service';

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
