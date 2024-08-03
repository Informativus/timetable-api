import { Inject } from '@nestjs/common';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { UpdateReplacementsDto } from 'src/dto/replacement/updateReplacementsListener/updateReplacements.dto';
import { dataParams } from './Types/dateParam.type';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';
import { IReplecementsFacade } from 'src/replacement/IReplacementsFacade.interface';
import { REPLACEMENTS_FACADE } from 'src/config/constants/constants';
import { ReplacementDto } from 'src/dto/replacement/replacement.dto';
import { ReplacementsInfoDto } from 'src/dto/replacement/updateReplacementsListener/replacementsInfo.dto';
//TODO подумать над удалением из пришедшего объекта данных которые уже использовались
export class UpdateReplacementsInStorage {
  constructor(
    @Inject(REPLACEMENTS_FACADE)
    private readonly replacementsFacade: IReplecementsFacade,
  ) {}

  async updateReplacements(
    replacementsDto: UpdateReplacementsDto,
  ): Promise<Empty> {
    const date: string = this.getDate({
      year: replacementsDto.date.year,
      month: replacementsDto.date.month,
      day: replacementsDto.date.day,
    });

    for (const item of replacementsDto.date.subst) {
      const getReplacementsDto: GetReplacementDto = {
        group: this.getGroupTextId(item.forms),
        date,
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

  getDate(date: dataParams): string {
    return `${date.year}-${date.month}-${date.day}`;
  }

  getGroupTextId(group: string): string {
    const russianEnglishDictionary = {
      А: 'A',
      Б: 'B',
      В: 'V',
      Г: 'G',
      Д: 'D',
      Е: 'E',
      Ж: 'ZH',
      З: 'Z',
      И: 'I',
      К: 'K',
      Л: 'L',
      М: 'M',
      Н: 'N',
      О: 'O',
      П: 'P',
      Р: 'R',
      С: 'S',
      Т: 'T',
      У: 'U',
      Ф: 'F',
      Х: 'H',
      Ц: 'C',
      Ч: 'CH',
      Ш: 'SH',
      Щ: "SH'",
      Ы: 'Y',
      Э: 'E',
      Ю: 'YU',
      Я: 'YA',
    };

    const translatedGroup: string = group
      .split('')
      .map((item) => {
        return russianEnglishDictionary[item] || item;
      })
      .join('');

    console.debug(translatedGroup);
    return translatedGroup;
  }

  getReplacementsArray(
    replacementsDto: ReplacementsInfoDto[],
    group: string,
  ): ReplacementDto[] {
    const replacements: ReplacementDto[] = replacementsDto
      .filter((item) => item.forms === group)
      .map((item) => ({
        index: Number(item.lesson), // Преобразование `lesson` в число
        cancelled: this.getCancelled(item),
        teacher: this.getSubstituting(item),
        room: this.getRoom(item),
        title: item.subject,
        class: item.forms,
      }));

    return replacements;
  }

  getCancelled(item: ReplacementsInfoDto): boolean {
    return item.cancelled ? true : false;
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
