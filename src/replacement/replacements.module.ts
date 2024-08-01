import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CacheService } from 'src/cache/cache.service';
import { CacheModule } from 'src/cache/cache.module';
import { ReplacementsController } from './replacements.controller';
import { ReplacementsFacade } from './replacementsFacade.service';
import { SetReplacements } from './SetReplacements/setReplacementsInDb.service';
import { GetReplacementsWithGroup } from './ReplacementsWithGroup/getReplacementsWithGroup.service';
import { GetReplacementsWithDate } from './ReplacementsWithDate/getReplacementsWithDate.service';
import { GroupModule } from 'src/group/group.module';
import {
  getReplacementsWithDate,
  getReplacementsWithGroup,
  groupFacade,
  replacementsRepository,
  setReplacementsInStorage,
} from './localConstants';
import { noRelationDatabase, relationDatabase } from '../config/constants';

@Module({
  imports: [GroupModule, CacheModule, DatabaseModule],
  controllers: [ReplacementsController],
  providers: [
    ReplacementsFacade,
    GetReplacementsWithGroup,
    GetReplacementsWithDate,
    SetReplacements,
    relationDatabase,
    noRelationDatabase,
    replacementsRepository,
    getReplacementsWithGroup,
    getReplacementsWithDate,
    setReplacementsInStorage,
    groupFacade,
    CacheService,
  ],
  exports: [ReplacementsFacade],
})
export class ReplacementsModule {}
