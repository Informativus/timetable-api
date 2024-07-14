import { Injectable } from '@nestjs/common';
import { IGroup } from './group.interface';

@Injectable()
export class GroupService implements IGroup {
  getWithId(group: string): string {
    return group;
  }

  getAllGroups(): string[] {
    return;
  }
}
