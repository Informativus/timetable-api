import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { IConfigService } from './config.interface';
import { config, DotenvParseOutput } from 'dotenv';
import { ConfigDto } from '../dto/config.dto';

@Injectable()
export class ConfigService implements IConfigService {
  private readonly config: DotenvParseOutput;

  constructor() {
    const { error, parsed } = config();
    if (error) {
      throw new Error(error.message);
    }
    if (!parsed) {
      throw new Error('Failed to parse .env file');
    }
    this.config = parsed;
  }

  @UsePipes(new ValidationPipe())
  get(key: ConfigDto): string {
    const res = this.config[key.property];

    if (!res) {
      throw new Error(`Key ${key} not found in .env file`);
    }

    return res;
  }
}
