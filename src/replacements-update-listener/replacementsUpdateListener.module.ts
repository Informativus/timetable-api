import { Module } from '@nestjs/common';
import { ReplacementsUpdateListener } from './replacementsUpdateListener.service';
import { ReplacementsUpdateListenerController } from './replacementsUpdateListener.controller';
import { ReplacementsFacade } from 'src/replacement/replacementsFacade.service';
import { SET_REPLACEMENTS_IN_STORAGE } from 'src/config/constants/constants';

@Module({
  controllers: [ReplacementsUpdateListenerController],
  providers: [
    ReplacementsUpdateListener,
    { provide: SET_REPLACEMENTS_IN_STORAGE, useExisting: ReplacementsFacade },
  ],
})
export class ReplacementsUpdateListenerModule {}
