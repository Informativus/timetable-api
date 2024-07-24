import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GroupDto } from '../dto/group/group.dto';
import { GroupService } from './group.service';
import { GetGroupDto } from '../dto/group/getGroup.dto';
import { InfoAllGroupDto } from '../dto/group/infoAllGroup.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('group')
@Controller()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('/group_info')
  @ApiOkResponse({ type: GetGroupDto })
  @ApiOperation({ summary: 'Get group info by group id' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getGroupWithId(@Query() groupData: GroupDto): Promise<GetGroupDto> {
    return await this.groupService.getGroupWithId(groupData);
  }

  @Get('/groups')
  @ApiOkResponse({ type: InfoAllGroupDto })
  @ApiOperation({ summary: 'Get all groups' })
  async getAllGroups(): Promise<InfoAllGroupDto> {
    return await this.groupService.getAllGroups();
  }
}
