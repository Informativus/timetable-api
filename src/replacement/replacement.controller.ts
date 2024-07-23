import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReplacementService } from './replacement.service';
import { CreateReplacementDto } from '../dto/replacement/createReplacement.dto';
import { GetReplacementDTO } from '../dto/replacement/getReplacement.dto';
import { ReplacementsIsEmty } from './types/replacementsIsEmty.type';

@Controller('replacement')
export class ReplacementController {
  constructor(private readonly replacementService: ReplacementService) {}

  @Get('/replacements')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getReplacements(
    @Query() replacementsDto: GetReplacementDTO,
  ): Promise<CreateReplacementDto | ReplacementsIsEmty> {
    if (replacementsDto.date) {
      return await this.replacementService.getReplacementsWithDate(
        replacementsDto,
      );
    }

    return await this.replacementService.getReplacementsWithGroup(
      replacementsDto,
    );
  }
}
