import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CacheService } from 'src/cache/cache.service';
import { CacheModule } from 'src/cache/cache.module';
import { ReplacementsController } from './replacements.controller';
import { ReplacementsFacade } from './ReplacementsComponent/replacementsFacade.service';
import { ReplacementPersistenceLayer } from './ReplacementsComponent/SetReplacements/replacementPersistenceLayer.service';
import { ReplacementData } from './ReplacementsComponent/ReplacementData/replacementData.service';
import { GroupModule } from 'src/group/group.module';
import {
  getReplacementsWithDate,
  replacementsRepository,
  setReplacementsInStorage,
} from './localConstants.constants';
import {
  getGroupWithData,
  noRelationDatabase,
  relationDatabase,
} from '../config/constants/provideConstants';

@Module({
  imports: [GroupModule, CacheModule, DatabaseModule],
  controllers: [ReplacementsController],
  providers: [
    ReplacementsFacade,
    ReplacementData,
    ReplacementPersistenceLayer,
    relationDatabase,
    noRelationDatabase,
    replacementsRepository,
    getReplacementsWithDate,
    setReplacementsInStorage,
    getGroupWithData,
    CacheService,
  ],
  exports: [ReplacementsFacade],
})
export class ReplacementsModule {}
