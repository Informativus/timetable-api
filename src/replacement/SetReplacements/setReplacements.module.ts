import { Module } from '@nestjs/common';
import { ReplacementsRepository } from '../repositories/replacementsRepository.service';
import { ReplacementsRepositoryModule } from '../repositories/replacementsRepository.module';
import { CacheModule } from 'src/cache/cache.module';
import { GroupService } from 'src/group/group.service';
import { GroupModule } from 'src/group/group.module';
import { SetReplacements } from './setReplacementsInDb.service';

Module({
  imports: [ReplacementsRepositoryModule, GroupModule, CacheModule],
  providers: [
    SetReplacements,
    {
      provide: 'IReplacementRepository',
      useClass: ReplacementsRepository,
    },
    {
      provide: 'IGroupService',
      useClass: GroupService,
    },
  ],
  exports: [SetReplacements],
});
export class SetReplacementsModule {}
