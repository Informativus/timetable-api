import { Inject } from '@nestjs/common';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { UpdateReplacementsDto } from 'src/dto/replacement/updateReplacementsListener/updateReplacements.dto';
import { dataParams } from './Types/dateParam.type';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';
import { IReplacementsFacade } from 'src/replacement/ReplacementsComponent/IReplacementsFacade.interface';
import {
  GET_GROUP_WITH_DATA,
  REPLACEMENTS_FACADE,
} from 'src/config/constants/constants';
import { ReplacementDto } from 'src/dto/replacement/replacement.dto';
import { ReplacementsInfoDto } from 'src/dto/replacement/updateReplacementsListener/replacementsInfo.dto';
import { getTranslatedWord } from 'src/utils/wordTranslator.util';
import { IGetGroupWithData } from 'src/group/Interfaces/IGetGroupWithData.interface';

export class UpdateReplacementsInStorage {
  constructor(
    @Inject(REPLACEMENTS_FACADE)
    private readonly replacementsFacade: IReplacementsFacade,
    @Inject(GET_GROUP_WITH_DATA)
    private readonly getGroupWithData: IGetGroupWithData,
  ) {}

  async updateReplacements(
    replacementsDto: UpdateReplacementsDto,
  ): Promise<Empty> {
    const date: string = this.getDate({
      year: replacementsDto.date.year,
      month: replacementsDto.date.month,
      day: replacementsDto.date.day,
    });

    const cacheFormsData: Set<string> = new Set();
    for (const item of replacementsDto.date.subst) {
      if (cacheFormsData.has(item.forms)) {
        continue;
      }

      cacheFormsData.add(item.forms);

      const translatedGroup: string = (
        await this.getGroupWithData.getGroupWithPartId(
          this.getTranslatedGroup(item.groups, item),
        )
      ).id;

      const getReplacementsDto: GetReplacementDto = {
        group: translatedGroup,
        date: date,
      };

      const createReplacements: CreateReplacementDto = {
        success: true,
        replacements: this.getReplacementsArray(
          replacementsDto.date.subst,
          item.forms,
        ),
      };

      await this.replacementsFacade.setReplacementsWithDate(
        getReplacementsDto,
        createReplacements,
      );
    }

    return new Empty();
  }

  getTranslatedGroup(subgroup: string, replacementsInfo: ReplacementsInfoDto) {
    const translatedGroup: string = getTranslatedWord(replacementsInfo.forms);
    return subgroup === 'Весь класс'
      ? translatedGroup
      : `${translatedGroup}${this.getSubgroup(subgroup)}`;
  }

  getSubgroup(subgroup: string): string {
    return subgroup === '1 группа' ? '_1' : '_2';
  }

  getDate(date: dataParams): string {
    return `${date.year}-${date.month}-${date.day}`;
  }

  getReplacementsArray(
    replacementsDto: ReplacementsInfoDto[],
    group: string,
  ): ReplacementDto[] {
    return replacementsDto
      .filter((item) => item.forms === group)
      .map((item) => ({
        index: Number(item.lesson),
        cancelled: this.getCancelled(item),
        teacher: this.getSubstituting(item),
        room: this.getRoom(item),
        title: item.subject,
        class: item.forms,
      }));
  }

  getCancelled(item: ReplacementsInfoDto): boolean {
    return !!item.cancelled;
  }

  getSubstituting(item: ReplacementsInfoDto): string {
    return item.substituting ? item.substituting : '';
  }

  getRoom(item: ReplacementsInfoDto): string {
    if (!item.room) {
      return '';
    }

    const roomParts = item.room.split(':');
    if (roomParts.length < 2) {
      return '';
    }

    return roomParts[1].trim();
  }
}
