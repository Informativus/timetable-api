import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  PATH_TO_REPLACEMENTS,
  REPLACEMENTS_API_TAG,
} from 'src/config/constants/constants';
import { CreateReplacementDto } from '../dto/replacement/createReplacement.dto';
import { GetReplacementDto } from '../dto/replacement/getReplacement.dto';
import { SuccessStatusDto } from '../dto/successStatus.dto';
import { ReplacementsFacade } from './replacementsFacade.service';

@ApiTags(REPLACEMENTS_API_TAG)
@Controller()
export class ReplacementsController {
  constructor(private readonly replacementService: ReplacementsFacade) {}

  @Get(PATH_TO_REPLACEMENTS)
  @ApiOperation({ summary: 'give replacements' })
  @ApiBadRequestResponse({
    description: 'Could not get replacements, the request is not correct!',
  })
  @ApiOkResponse({
    description: 'Replacements was received successfully',
    schema: {
      oneOf: [
        { $ref: getSchemaPath(CreateReplacementDto) },
        { $ref: getSchemaPath(SuccessStatusDto) },
      ],
    },
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getReplacements(
    @Query() replacementsDto: GetReplacementDto,
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
