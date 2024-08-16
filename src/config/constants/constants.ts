// Main constants

export const MAIN_PATH = 'api';
export const SWAGGER = 'api';
export const DEFAULT_PORT = 8080;
export const REPLACEMENTS_GRPC_PATH = 'localhost:8081';
export const TIMETABLE_GRPC_PATH = 'localhost:8082';

// Group constants

export const GROUP_API_TAG = 'group';
export const PATH_TO_GROUPS = 'groups';
export const PATH_TO_GROUP_ID = 'group_info';

// Group interfaces constants

export const GROUP_REPOSITORY = 'IGroupRepository';
export const GET_GROUP_WITH_DATA = 'IGetGroupWithData';
export const SET_GROUP_IN_STORAGE = 'ISetGroupInStorage';
export const CHECK_GROUP_DATA = 'ICheckGroupData';

// Replacement constants

export const REPLACEMENTS_API_TAG = 'replacements';
export const PATH_TO_REPLACEMENTS = 'replacements';

// Replacement interfaces constants

export const REPLACEMENTS_REPOSITORY = 'IReplacementRepository';
export const REPLACEMENTS_FACADE = 'IReplacementFacade';
export const GET_REPLACEMENTS_WITH_DATE = 'IGetReplaceWithDate';
export const SET_REPLACEMENTS_IN_STORAGE = 'ISetReplaceInStorage';

// Timetable constants

export const TIMETABLE_API_TAG = 'timetable';
export const PATH_TO_TIMETABLE = 'timetable';

// Timetable interfaces constants

export const TIMETABLE_REPOSITORY = 'ITimetableRepository';
export const SET_TIMETABLE_IN_STORAGE = 'ISetTimetableInStorage';

// Database constants

export const RELATION_DATABASE = 'IRelationDatabase';
export const NO_RELATION_DATABASE = 'INoRelationDatabase';

// gRPC constants

export const REPLACEMENTS_PACKAGE = 'REPLACEMENTS_PACKAGE';
export const TIMETABLE_PACKAGE = 'TIMETABLE_PACKAGE';
