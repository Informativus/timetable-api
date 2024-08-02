// Main constants
import { PostgresDatabaseService } from '../database/postgres-database/postgresDatabase.service';
import { RedisDatabaseService } from '../database/redis-database/redis-database.service';

export const MAIN_PATH = 'api';
export const SWAGGER = 'api';
export const DEFAULT_PORT = 8080;

// Group constants

export const GROUP_API_TAG = 'group';
export const PATH_TO_GROUPS = 'groups';
export const PATH_TO_GROUP_ID = 'group_info';

// Group interfaces constants

export const GROUP_REPOSITORY = 'IGroupRepository';
export const GET_GROUP_WITH_DATA = 'IGetGroupWithData';
export const SET_GROUP_IN_STORAGE = 'ISetGroupInStorage';

// Replacement constants

export const REPLACEMENTS_API_TAG = 'replacements';
export const PATH_TO_REPLACEMENTS = 'replacements';

// Replacement interfaces constants

export const REPLACEMENTS_REPOSITORY = 'IReplacementRepository';
export const GET_REPLACEMENTS_WITH_GROUP = 'IGetReplaceWithGroup';
export const GET_REPLACEMENTS_WITH_DATE = 'IGetReplaceWithDate';
export const SET_REPLACEMENTS_IN_STORAGE = 'ISetReplaceInStorage';

// Timetable constants

export const TIMETABLE_API_TAG = 'timetable';
export const PATH_TO_TIMETABLE = 'timetable';

// Database constants

export const RELATION_DATABASE = 'IRelationDatabase';
export const NO_RELATION_DATABASE = 'INoRelationDatabase';

export const relationDatabase = {
  provide: RELATION_DATABASE,
  useClass: PostgresDatabaseService,
};

export const noRelationDatabase = {
  provide: NO_RELATION_DATABASE,
  useClass: RedisDatabaseService,
};
