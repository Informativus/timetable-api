import { Module } from '@nestjs/common';
import { UpdateReplacementsListenerController } from './updateReplacementsListener.controller';
import { UpdateReplacementsListener } from './updateReplacementsListener.service';
import { GET_GROUP_WITH_DATA, REPLACEMENTS_FACADE } from 'src/config/constants/constants';
import { ReplacementsFacade } from 'src/replacement/replacementsFacade.service';
import { ReplacementsModule } from 'src/replacement/replacements.module';
import { UpdateReplacementsInStorage } from './ReplacementsUpdater/updateReplacements.service';
import { GroupModule } from '../group/group.module';
import { GroupFacade } from '../group/groupFacade.service';

@Module({
  imports: [ReplacementsModule, GroupModule],
  controllers: [UpdateReplacementsListenerController],
  providers: [
    UpdateReplacementsListener,
    UpdateReplacementsInStorage,
    { provide: REPLACEMENTS_FACADE, useExisting: ReplacementsFacade },
    { provide: GET_GROUP_WITH_DATA, useExisting: GroupFacade },
  ],
})
export class UpdateReplacementsListenerModule {}
