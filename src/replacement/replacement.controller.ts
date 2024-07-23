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
import { SuccessStatusDto } from '../dto/successStatus.dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('replacement')
@Controller()
export class ReplacementController {
  constructor(private readonly replacementService: ReplacementService) {}

  @Get('/replacements')
  @ApiOperation({ summary: 'give replacements' })
  @ApiBadRequestResponse({
    description: 'Could not get replacements, the request is not correct!',
  })
  @ApiOkResponse({
    description: 'Replacements was received successfully',
    schema: {
      oneOf: [
        { $ref: getSchemaPath(SuccessStatusDto) },
        { $ref: getSchemaPath(CreateReplacementDto) },
      ],
    },
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getReplacements(
    @Query() replacementsDto: GetReplacementDTO,
  ): Promise<CreateReplacementDto | SuccessStatusDto> {
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
