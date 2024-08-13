import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  GROUP_API_TAG,
  PATH_TO_GROUP_ID,
  PATH_TO_GROUPS,
} from 'src/config/constants/constants';
import { GetGroupDto } from '../dto/group/getGroup.dto';
import { GroupDto } from '../dto/group/group.dto';
import { InfoAllGroupDto } from '../dto/group/infoAllGroup.dto';
import { GroupFacade } from './groupFacade.service';

@ApiTags(GROUP_API_TAG)
@Controller()
export class GroupController {
  constructor(private readonly groupService: GroupFacade) {}

  @Get(PATH_TO_GROUP_ID)
  @ApiOkResponse({ type: GetGroupDto })
  @ApiOperation({ summary: 'Get group info by group id' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getGroupWithId(@Query() groupData: GroupDto): Promise<GetGroupDto> {
    return await this.groupService.getGroupWithId(groupData);
  }

  @Get(PATH_TO_GROUPS)
  @ApiOkResponse({ type: InfoAllGroupDto })
  @ApiOperation({ summary: 'Get all groups' })
  async getAllGroups(): Promise<InfoAllGroupDto> {
    return await this.groupService.getGroupsWithExistsTimetable();
  }
}
