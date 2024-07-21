import { Module } from '@nestjs/common';
import { ReplacementService } from './replacement.service';
import { ReplacementController } from './replacement.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ReplacementController],
  providers: [ReplacementService],
})
export class ReplacementModule {}
