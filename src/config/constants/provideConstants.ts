import { PostgresDatabaseService } from '../../database/postgres-database/postgresDatabase.service';
import { RedisDatabaseService } from '../../database/redis-database/redis-database.service';
import { GET_GROUP_WITH_DATA, NO_RELATION_DATABASE, RELATION_DATABASE } from './constants';
import { GroupFacade } from '../../group/groupFacade.service';

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
