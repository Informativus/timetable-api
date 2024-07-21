import { Module } from '@nestjs/common';
import { ReplacementService } from './replacement.service';
import { ReplacementController } from './replacement.controller';

@Module({
  controllers: [ReplacementController],
  providers: [ReplacementService],
})
export class ReplacementModule {}
