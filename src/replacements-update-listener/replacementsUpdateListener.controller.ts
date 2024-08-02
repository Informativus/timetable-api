import { Controller } from '@nestjs/common';
import { ReplacementsUpdateListenerService } from './replacements-update-listener.service';

@Controller('replacements-update-listener')
export class ReplacementsUpdateListenerController {
  constructor(private readonly replacementsUpdateListenerService: ReplacementsUpdateListenerService) {}
}
