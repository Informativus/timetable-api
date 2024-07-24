import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SuccessStatusDto } from './dto/successStatus.dto';

@ApiTags('Example')
@Controller()
export class AppController {
  @Get('example')
  @ApiOperation({ summary: 'This is a request for a server health test' })
  @ApiOkResponse({ type: SuccessStatusDto })
  getExample() {
    return { success: true };
  }
}
