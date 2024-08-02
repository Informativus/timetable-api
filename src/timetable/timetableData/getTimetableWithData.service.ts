import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  GET_GROUP_WITH_DATA,
  TIMETABLE_REPOSITORY,
} from 'src/config/constants';
import { ITimetableRepository } from '../repositories/timetableRepository.interface';
import { IGetGroupWithData } from 'src/group/Interfaces/IGetGroupWithData.interface';
import { ensureGroupExists } from 'src/utils/group.util';
import { isDataNotEmpty } from 'src/utils/isDataNotEmpty.util';
import { CreateTimetableDto } from 'src/dto/timetable/CreateTimetable.dto';
import { GroupDto } from 'src/dto/group/group.dto';

@Injectable()
export class GetTimetableWithData {
  constructor(
    @Inject(GET_GROUP_WITH_DATA)
    private readonly groupService: IGetGroupWithData,
    @Inject(TIMETABLE_REPOSITORY)
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
}
