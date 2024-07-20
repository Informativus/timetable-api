import { QueryConfig } from 'pg';

export interface IRelationDatabase {
  sendQuery(query: QueryConfig): Promise<any>;
}
