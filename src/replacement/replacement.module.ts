import { Module } from '@nestjs/common';
import { ReplacementService } from './replacement.service';
import { ReplacementController } from './replacement.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ReplacementRepositoryService } from './repositories/replacementRepository.service';
import { PostgresDatabaseService } from 'src/database/postgres-database/postgresDatabase.service';
import { CacheModule } from 'src/cash/cache.module';

@Module({
  imports: [DatabaseModule, CacheModule],
  controllers: [ReplacementController],
  providers: [
    ReplacementService,
    {
      provide: 'IReplacementRepository',
      useClass: ReplacementRepositoryService,
    },
    ReplacementRepositoryService,
    { provide: 'IRelationDatabase', useClass: PostgresDatabaseService },
  ],
})
export class ReplacementModule {
}
