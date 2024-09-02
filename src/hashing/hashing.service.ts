import { Injectable } from '@nestjs/common';
import { IHashing } from './Interfaces/hashing.interface';
import * as crypto from 'crypto';

@Injectable()
export class HashingService implements IHashing {
  hash(data: string): string {
    return crypto.createHash('sha512').update(data).digest('hex');
  }

  salt(): string {
    return crypto.randomBytes(16).toString('hex');
  }
}
