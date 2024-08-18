import { Module } from '@nestjs/common';
import {
  getGroupWithData,
  replacementFacade,
} from 'src/config/constants/provideConstants';
import { ReplacementsModule } from 'src/replacement/replacements.module';
import { GroupModule } from '../group/group.module';
import { UpdateReplacementsInStorage } from './ReplacementsUpdater/updateReplacements.service';
import { UpdateReplacementsListenerController } from './updateReplacementsListener.controller';
import { UpdateReplacementsListener } from './updateReplacementsListener.service';

@Module({
  imports: [ReplacementsModule, GroupModule],
  controllers: [UpdateReplacementsListenerController],
  providers: [
    UpdateReplacementsListener,
    UpdateReplacementsInStorage,
    replacementFacade,
    getGroupWithData,
  ],
})
export class UpdateReplacementsListenerModule {}
