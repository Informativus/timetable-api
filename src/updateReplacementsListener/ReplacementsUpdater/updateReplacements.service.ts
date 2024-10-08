import { Inject } from '@nestjs/common';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import {
  GET_GROUP_WITH_DATA,
  REPLACEMENTS_FACADE,
} from 'src/config/constants/constants';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';
import { ReplacementDto } from 'src/dto/replacement/replacement.dto';
import { ReplacementsInfoDto } from 'src/dto/replacement/updateReplacementsListener/replacementsInfo.dto';
import { UpdateReplacementsDto } from 'src/dto/replacement/updateReplacementsListener/updateReplacements.dto';
import { IGetGroupWithData } from 'src/group/Interfaces/IGetGroupWithData.interface';
import { IReplacementsFacade } from 'src/replacement/Interfaces/IReplacementsFacade.interface';
import { getTranslatedWord } from 'src/utils/wordTranslator.util';
import { TDataParams } from './Types/dateParam.type';

export class UpdateReplacementsInStorage {
  constructor(
    @Inject(REPLACEMENTS_FACADE)
    private readonly replacementsFacade: IReplacementsFacade,
    @Inject(GET_GROUP_WITH_DATA)
    private readonly getGroupWithData: IGetGroupWithData,
  ) {}

  async updateReplacements(
    updateReplacementsDto: UpdateReplacementsDto,
  ): Promise<Empty> {
    const date: string = this.getDate({
      year: updateReplacementsDto.date.year,
      month: updateReplacementsDto.date.month,
      day: updateReplacementsDto.date.day,
    });

    const cacheFormsData: Set<string> = new Set();
    for (const item of updateReplacementsDto.date.subst) {
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
          updateReplacementsDto.date.subst,
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

  getDate(date: TDataParams): string {
    return `${date.year}-${date.month}-${date.day}`;
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

  getReplacementsArray(
    replacementsInfoDto: ReplacementsInfoDto[],
    group: string,
  ): ReplacementDto[] {
    return replacementsInfoDto
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
