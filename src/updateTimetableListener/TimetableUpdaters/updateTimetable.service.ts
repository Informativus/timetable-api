import { Inject } from '@nestjs/common';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import * as constants from 'src/config/constants/constants';
import { PeriodsData } from 'src/dto/timetable/UpdateTimetable/periods/periodsData.dto';
import { UpdateTimetableDto } from 'src/dto/timetable/UpdateTimetable/UpdateTimetable.dto';
import { ISetTimetableInStorage } from 'src/timetable/Interfaces/ISetTimetableInStorage.intervace';
import { lessonsData } from './Types/lessonsData.type';
import { CreateTimetableDto } from 'src/dto/timetable/CreateTimetable.dto';
import { LessonCreator } from './Lessons/lessonCreator.service';
import { WeekCreator } from './WeekTimetable/weekTimetable.service';
import { ICheckGroupData } from 'src/group/Interfaces/ICheckGroupData.interface';
import { getTranslatedWord } from 'src/utils/wordTranslator.util';
import { ISetGroupInStorage } from 'src/group/Interfaces/ISetGroupInStorage.interface';
import { Metadata } from '@grpc/grpc-js';
import { ClassArray } from 'src/dto/timetable/UpdateTimetable/classes/classArray.dto';
import { GroupArray } from '../../dto/timetable/UpdateTimetable/groups/groupArray.dto';
import { LessonArray } from '../../dto/timetable/UpdateTimetable/lessons/lessonArray.dto';
import { subgroupIds } from './Types/subgroupIds.type';

export class UpdateTimetable {
  constructor(
    @Inject(constants.SET_TIMETABLE_IN_STORAGE)
    private readonly setTimetable: ISetTimetableInStorage,
    @Inject(constants.CHECK_GROUP_DATA)
    private readonly checkGroupData: ICheckGroupData,
    @Inject(constants.SET_GROUP_IN_STORAGE)
    private readonly setGroupInStorage: ISetGroupInStorage,
    private readonly lessonCreator: LessonCreator,
    private readonly weekCreator: WeekCreator,
  ) {}

  async updateTimetable(
    updateTimetableDto: UpdateTimetableDto,
  ): Promise<Empty> {
    const times: string[][] = this.getTimes(updateTimetableDto.periods);

    for (const group of updateTimetableDto.classes.class) {
      const subgroups: GroupArray[] = updateTimetableDto.groups.group.filter(
        (item) => item.classid === group.id,
      );
      const subgroupsIds: subgroupIds[] = this.getSubgroupsIds(
        subgroups,
        updateTimetableDto,
      );

      if (subgroupsIds.length <= 1) {
        const groupTextId: string = getTranslatedWord(group.name);
        await this.checkGroupOnExisting(groupTextId, group.name);

        const createTimetableData: CreateTimetableDto = this.getCreateTimetable(
          group,
          updateTimetableDto,
          times,
          subgroupsIds,
        );

        await this.setTimetableInStorage(createTimetableData, groupTextId);
        continue;
      }

      await this.setTimetableInStorageWithSubgroup(
        subgroupsIds,
        group,
        updateTimetableDto,
        times,
      );
    }
    return new Empty();
  }

  getTimes(periods: PeriodsData): string[][] {
    const times: string[][] = [];

    periods.period.forEach((period) => {
      const startTime: string[] = period.starttime.split(':');
      const endTime: string[] = period.endtime.split(':');

      if (startTime.length === 2 && endTime.length === 2) {
        times.push([startTime[0], startTime[1], endTime[0], endTime[1]]);
      } else {
        throw new Error('Invalid time format');
      }
    });

    return times;
  }

  getSubgroupsIds(
    subgroups: GroupArray[],
    updateTimetableDto: UpdateTimetableDto,
  ) {
    const subgroupsIds: subgroupIds[] = [];
    for (const subgroup of subgroups) {
      if (subgroup.name === 'Весь класс') {
        subgroupsIds.push({
          subgroupIds: subgroup.id,
          subgroupName: subgroup.name,
        });
        continue;
      }

      const lessonsSubgroup: LessonArray =
        updateTimetableDto.lessons.lesson.find(
          (item) => subgroup.id === item.groupids,
        );
      if (lessonsSubgroup) {
        subgroupsIds.push({
          subgroupIds: subgroup.id,
          subgroupName: subgroup.name,
        });
      }
    }
    return subgroupsIds;
  }

  async setTimetableInStorageWithSubgroup(
    subgroupsIds: subgroupIds[],
    group: ClassArray,
    updateTimetableDto: UpdateTimetableDto,
    times: string[][],
  ) {
    for (const subgroup of subgroupsIds) {
      if (subgroup.subgroupName === '1 группа') {
        const groupTextId: string = `${getTranslatedWord(group.name)}_1`;
        await this.checkGroupOnExisting(
          groupTextId,
          `${group.name} (1 группа)`,
        );

        const createTimetableData: CreateTimetableDto = this.getCreateTimetable(
          group,
          updateTimetableDto,
          times,
          subgroupsIds.filter((item) => item.subgroupName !== '2 группа'),
        );
        await this.setTimetableInStorage(createTimetableData, groupTextId);
      } else if (subgroup.subgroupName === '2 группа') {
        const groupTextId: string = `${getTranslatedWord(group.name)}_2`;
        await this.checkGroupOnExisting(groupTextId, `${group.name}_2`);

        const createTimetableData: CreateTimetableDto = this.getCreateTimetable(
          group,
          updateTimetableDto,
          times,
          subgroupsIds.filter((item) => item.subgroupName !== '1 группа'),
        );
        await this.setTimetableInStorage(createTimetableData, groupTextId);
      }
    }
  }

  async checkGroupOnExisting(groupTextId: string, groupTitle: string) {
    if (
      !(await this.checkGroupData.isExistsGroup({
        id: groupTextId,
      }))
    ) {
      await this.setGroupInStorage.setGroup({
        id: groupTextId,
        title: groupTitle,
      });
    }
  }

  getCreateTimetable(
    group: ClassArray,
    updateTimetableDto: UpdateTimetableDto,
    times: string[][],
    subgroupIds: subgroupIds[],
  ): CreateTimetableDto {
    const lessonsData: lessonsData = this.lessonCreator.getLessons(
      group.id,
      updateTimetableDto,
      subgroupIds,
    );

    const even: number[][] = this.weekCreator.getEven(
      lessonsData.lessonsAllIds,
      lessonsData.lessonsValidIds,
      lessonsData.repeatIds,
      updateTimetableDto,
    );

    const odd: number[][] = this.weekCreator.getOdd(
      lessonsData.lessonsAllIds,
      lessonsData.lessonsValidIds,
      lessonsData.repeatIds,
      updateTimetableDto,
    );

    return {
      lessons: lessonsData.lessons,
      even: even,
      odd: odd,
      times: times,
    };
  }

  async setTimetableInStorage(
    createTimetableData: CreateTimetableDto,
    groupTextId: string,
  ) {
    try {
      await this.setTimetable.setTimetableInDb(
        {
          id: groupTextId,
        },
        createTimetableData,
      );
    } catch (error) {
      throw {
        code: 13,
        message: `Error: ${error}`,
        name: 'Internal Server Error',
        details: 'Validation Error',
        metadata: new Metadata(),
      };
    }
  }
}
