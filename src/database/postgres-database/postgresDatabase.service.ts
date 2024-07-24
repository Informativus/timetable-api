import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigService } from '../../config/config.service';
import { IRelationDatabase } from '../relationDatabase.interface';
import * as console from 'node:console';
import { RelationDatabaseDto } from '../../dto/relationDatabase.dto';

@Injectable()
export class PostgresDatabaseService implements IRelationDatabase {
  private pool: Pool;
  private config: ConfigService;

  constructor() {
    this.config = new ConfigService();
    this.pool = new Pool({
      user: this.config.get({ property: 'PSQL_USER' }),
      password: this.config.get({ property: 'PSQL_PASSWORD' }),
      host: this.config.get({ property: 'PSQL_HOST' }),
      port: <number>(<any>this.config.get({ property: 'PSQL_PORT' })),
      database: this.config.get({ property: 'PSQL_DATABASE' }),
    });
  }

  async sendQuery(query: RelationDatabaseDto): Promise<any> {
    console.debug('Send query');
    try {
      const { text, values } = query;
      const fullQuery = this.interpolateQuery(text, values);
      console.log(`Full request it is: ${fullQuery}`);
      const result = await this.pool.query(query);
      console.debug(`Database response: ${JSON.stringify(result.rows)}`);
      return result.rows;
    } catch (err) {
      throw new Error(`Database query failed: ${err.message}`);
    }
  }

  private interpolateQuery(text: string, values: any[]): string {
    let index = 0;
    return text.replace(/\$[0-9]+/g, () => {
      const value = values[index++];
      return typeof value === 'string' ? `'${value}'` : value;
    });
  }
}