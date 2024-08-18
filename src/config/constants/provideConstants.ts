import { ReplacementsFacade } from 'src/replacement/ReplacementsComponent/replacementsFacade.service';
import { PostgresDatabaseService } from '../../database/postgres-database/postgresDatabase.service';
import { RedisDatabaseService } from '../../database/redis-database/redis-database.service';
import { GroupFacade } from '../../group/groupFacade.service';
import {
  CHECK_GROUP_DATA,
  GET_GROUP_WITH_DATA,
  NO_RELATION_DATABASE,
  RELATION_DATABASE,
  REPLACEMENTS_FACADE,
} from './constants';

export const relationDatabase = {
  provide: RELATION_DATABASE,
  useClass: PostgresDatabaseService,
};

export const noRelationDatabase = {
  provide: NO_RELATION_DATABASE,
  useClass: RedisDatabaseService,
};

export const getGroupWithData = {
  provide: GET_GROUP_WITH_DATA,
  useExisting: GroupFacade,
};

export const checkGroupData = {
  provide: CHECK_GROUP_DATA,
  useClass: GroupFacade,
};

export const replacementFacade = {
  provide: REPLACEMENTS_FACADE,
  useClass: ReplacementsFacade,
};
