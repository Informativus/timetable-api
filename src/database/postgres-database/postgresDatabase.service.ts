import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigService } from '../../config/config.service';
import { IRelationDatabase } from '../relationDatabase.interface';
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
      port: Number(this.config.get({ property: 'PSQL_PORT' })),
      database: this.config.get({ property: 'PSQL_DATABASE' }),
    });
  }

  async sendQuery<T extends object, K>(
    query: RelationDatabaseDto<K>,
  ): Promise<T[]> {
    try {
      const { text, values } = query;
      const fullQuery = this.interpolateQuery(text, values);
      console.log(fullQuery);
      const result = await this.pool.query(query);
      return result.rows;
    } catch (err) {
      throw new Error(`Database query failed: ${err.message}`);
    }
  }

  private interpolateQuery<K>(text: string, values: K[]): string {
    let index = 0;
    return text.replace(/\$[0-9]+/g, () => {
      const value = values[index++];
      return typeof value === 'string' ? `'${value}'` : `'${value.toString()}'`;
    });
  }
}
