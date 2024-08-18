import {
  GET_REPLACEMENTS_WITH_DATE,
  REPLACEMENTS_FACADE,
  REPLACEMENTS_REPOSITORY,
  SET_REPLACEMENTS_IN_STORAGE,
} from '../config/constants/constants';
import { ReplacementsFacade } from './ReplacementsComponent/replacementsFacade.service';
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

export const replacementFacade = {
  provide: REPLACEMENTS_FACADE,
  useClass: ReplacementsFacade,
};
