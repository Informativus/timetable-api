import { ConfigDto } from '../dto/config.dto';

export interface IConfigService {
  get(key: ConfigDto): string;
}
