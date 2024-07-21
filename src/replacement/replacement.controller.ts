import { Controller } from '@nestjs/common';
import { ReplacementService } from './replacement.service';

@Controller('replacement')
export class ReplacementController {
  constructor(private readonly replacementService: ReplacementService) {}
}
