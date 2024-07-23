import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SuccessStatusDto } from './dto/successStatus.dto';

@ApiTags('Example')
@Controller()
export class AppController {
  @Get('example')
  @ApiOperation({ summary: 'It is example query' })
  @ApiOkResponse({ type: SuccessStatusDto })
  getExample() {
    return { success: true };
  }
}
