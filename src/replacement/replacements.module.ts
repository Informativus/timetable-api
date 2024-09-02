import { Module } from '@nestjs/common';
import { CacheModule } from 'src/cache/cache.module';
import { CacheService } from 'src/cache/cache.service';
import { DatabaseModule } from 'src/database/database.module';
import { GroupModule } from 'src/group/group.module';
import {
  getGroupWithData,
  relationDatabase,
} from '../config/constants/provideConstants';
import {
  getReplacementsWithDate,
  replacementFacade,
  replacementsRepository,
  setReplacementsInStorage,
} from './localConstants.constants';
import { ReplacementsController } from './replacements.controller';
import { ReplacementData } from './ReplacementsComponent/ReplacementData/replacementData.service';
import { ReplacementPersistenceLayer } from './ReplacementsComponent/ReplacementPersistence/replacementPersistenceLayer.service';
import { ReplacementsFacade } from './ReplacementsComponent/replacementsFacade.service';

@Module({
  imports: [GroupModule, CacheModule, DatabaseModule],
  controllers: [ReplacementsController],
  providers: [
    ReplacementsFacade,
    ReplacementData,
    ReplacementPersistenceLayer,
    relationDatabase,
    replacementsRepository,
    getReplacementsWithDate,
    setReplacementsInStorage,
    getGroupWithData,
    replacementFacade,
  ],
  exports: [ReplacementsFacade],
})
export class ReplacementsModule {}
