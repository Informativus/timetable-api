import {
  GET_REPLACEMENTS_WITH_DATE,
  REPLACEMENTS_REPOSITORY,
  SET_REPLACEMENTS_IN_STORAGE,
} from '../config/constants/constants';
import { ReplacementsRepository } from './ReplacementsComponent/ReplacementsRepository/replacementsRepository.service';

export const replacementsRepository = {
  provide: REPLACEMENTS_REPOSITORY,
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
