import { Module } from '@nestjs/common';
import { ReplacementsRepository } from './replacementsRepository.service';
import { DatabaseModule } from 'src/database/database.module';
import { PostgresDatabaseService } from 'src/database/postgres-database/postgresDatabase.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'IRelationDatabase',
      useClass: PostgresDatabaseService,
    },
    ReplacementsRepository,
  ],
  exports: [ReplacementsRepository],
})
export class ReplacementsRepositoryModule {}
