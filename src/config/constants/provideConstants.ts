import { ReplacementsFacade } from 'src/replacement/ReplacementsComponent/replacementsFacade.service';
import { PostgresDatabaseService } from '../../database/postgres-database/postgresDatabase.service';
import { GroupFacade } from '../../group/groupFacade.service';
import {
  GET_GROUP_WITH_DATA,
  RELATION_DATABASE,
  REPLACEMENTS_FACADE,
} from './constants';

export const relationDatabase = {
  provide: RELATION_DATABASE,
  useClass: PostgresDatabaseService,
};

export const getGroupWithData = {
  provide: GET_GROUP_WITH_DATA,
  useExisting: GroupFacade,
};

export const replacementFacade = {
  provide: REPLACEMENTS_FACADE,
  useExisting: ReplacementsFacade,
};
