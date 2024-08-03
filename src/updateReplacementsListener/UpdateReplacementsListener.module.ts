import { Module } from '@nestjs/common';
import { UpdateReplacementsListenerController } from './updateReplacementsListener.controller';
import { UpdateReplacementsListener } from './updateReplacementsListener.service';
import { REPLACEMENTS_FACADE } from 'src/config/constants/constants';
import { ReplacementsFacade } from 'src/replacement/replacementsFacade.service';
import { ReplacementsModule } from 'src/replacement/replacements.module';
import { UpdateReplacementsInStorage } from './ReplacementsUpdater/updateReplacements.service';

@Module({
  imports: [ReplacementsModule],
  controllers: [UpdateReplacementsListenerController],
  providers: [
    UpdateReplacementsListener,
    UpdateReplacementsInStorage,
    { provide: REPLACEMENTS_FACADE, useExisting: ReplacementsFacade },
  ],
})
export class UpdateReplacementsListenerModule {}
