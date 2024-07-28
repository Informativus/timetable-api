import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ITimetable } from './timetable.interface';
import { CreateTimetableDto } from '../dto/timetable/CreateTimetable.dto';
import { ITimetableRepository } from './repositories/timetableRepository.interface';
import { GroupDto } from 'src/dto/group/group.dto';
import { IGroupService } from 'src/group/groupService.interface';
import { ValidateAndMapDto } from 'src/validators/validateAndMapDtoDecorator.validator';
import { isDataNotEmpty } from 'src/utils/isDataNotEmpty.util';
import { ensureGroupExists } from 'src/utils/group.util';
import { GroupId } from 'src/group/types/groupId.type';

@Injectable()
export class TimetableService implements ITimetable {
  constructor(
    @Inject('IGroupService')
    private readonly groupService: IGroupService,
    @Inject('ITimetableRepository')
    private readonly timetableRepository: ITimetableRepository,
  ) {}

  async getTimetable(groupDto: GroupDto): Promise<CreateTimetableDto> {
    await ensureGroupExists(this.groupService, groupDto);

    const timetable: CreateTimetableDto[] =
      await this.timetableRepository.getTimetableWithGroup(groupDto.id);

    if (!isDataNotEmpty(timetable[0])) {
      throw new InternalServerErrorException('Timetable not found');
    }

    return timetable[0];
  }

  @ValidateAndMapDto(GroupDto, CreateTimetableDto)
  async setTimetable(
    groupDto: GroupDto,
    timetable: CreateTimetableDto,
  ): Promise<void> {
    const groupId: GroupId = <GroupId>(
      await this.groupService.getGroupWithId(groupDto)
    );

    await this.timetableRepository.setTimetable(groupId, timetable);
  }
}
