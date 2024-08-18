import {
  Controller,
  Get,
  Inject,
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
import { format } from 'date-fns';
import {
  PATH_TO_REPLACEMENTS,
  REPLACEMENTS_API_TAG,
  REPLACEMENTS_FACADE,
} from 'src/config/constants/constants';
import { formatDateToSql } from 'src/utils/date.util';
import { CreateReplacementDto } from '../dto/replacement/createReplacement.dto';
import { GetReplacementDto } from '../dto/replacement/getReplacement.dto';
import { SuccessStatusDto } from '../dto/successStatus.dto';
import { IReplacementsFacade } from './ReplacementsComponent/IReplacementsFacade.interface';

@ApiTags(REPLACEMENTS_API_TAG)
@Controller()
export class ReplacementsController {
  constructor(
    @Inject(REPLACEMENTS_FACADE)
    private readonly replacementService: IReplacementsFacade,
  ) {}

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
      replacementsDto.date = formatDateToSql(replacementsDto.date);
      return await this.replacementService.getReplacementsWithDate(
        replacementsDto,
      );
    } else {
      replacementsDto.date = format(new Date(), 'yyyy-MM-dd');
      return await this.replacementService.getReplacementsWithDate(
        replacementsDto,
      );
    }
  }
}
