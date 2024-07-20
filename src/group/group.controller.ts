import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GroupDto } from '../dto/group.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  @Get('/group_info')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getGroupWithId(@Query() groupData: GroupDto) {
    return await this.groupService.getWithId(groupData);
  }
  @Get('/groups')
  async getAllGroups() {
    return await this.groupService.getAllGroups();
  }
}
