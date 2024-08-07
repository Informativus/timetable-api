import { UpdateTimetableDto } from '../../../dto/timetable/UpdateTimetable/UpdateTimetable.dto';
import { CardArray } from '../../../dto/timetable/UpdateTimetable/cards/cardArray.dto';

export class WeekCreator {
  constructor() {}

  getEven(
    lessonsAllIds: string[],
    lessonsValidIds: string[],
    repeatIds: any,
    timetableData: UpdateTimetableDto,
  ): number[][] {
    const validCardsArray: CardArray[] = timetableData.cards.card
      .filter(
        (card) => lessonsAllIds.includes(card.lessonid) && card.weeks !== '01',
      )
      .sort((a, b) => parseInt(a.period) - parseInt(b.period));

    return this.getWeekArray(validCardsArray, lessonsValidIds, repeatIds);
  }

  getOdd(
    lessonsAllIds: string[],
    lessonsValidIds: string[],
    repeatIds: any,
    timetableData: UpdateTimetableDto,
  ): number[][] {
    const validCardsArray: CardArray[] = timetableData.cards.card
      .filter(
        (card) => lessonsAllIds.includes(card.lessonid) && card.weeks !== '10',
      )
      .sort((a, b) => parseInt(a.period) - parseInt(b.period));

    return this.getWeekArray(validCardsArray, lessonsValidIds, repeatIds);
  }

  private getDayArray(
    day: string,
    maxPeriods: number,
    validCardsArray: CardArray[],
    lessonsValidIds: string[],
    repeatIds: any,
  ): number[] {
    const dayCards: CardArray[] = validCardsArray.filter((card) => {
      return card.days === day;
    });

    const resultArray: Array<number> = new Array(maxPeriods).fill(0);
    dayCards.forEach((card) => {
      resultArray[parseInt(card.period)] =
        lessonsValidIds.indexOf(card.lessonid) === -1
          ? repeatIds[card.lessonid]
          : lessonsValidIds.indexOf(card.lessonid) + 1;
    });
    return resultArray;
  }

  getWeekArray(
    validCardsArray: CardArray[],
    lessonsValidIds: string[],
    repeatIds: any,
  ) {
    const mon: number[] = this.getDayArray(
      '10000',
      6,
      validCardsArray,
      lessonsValidIds,
      repeatIds,
    );

    const tue: number[] = this.getDayArray(
      '01000',
      6,
      validCardsArray,
      lessonsValidIds,
      repeatIds,
    );
    const wed: number[] = this.getDayArray(
      '00100',
      6,
      validCardsArray,
      lessonsValidIds,
      repeatIds,
    );
    const thu: number[] = this.getDayArray(
      '00010',
      6,
      validCardsArray,
      lessonsValidIds,
      repeatIds,
    );
    const fri: number[] = this.getDayArray(
      '00001',
      6,
      validCardsArray,
      lessonsValidIds,
      repeatIds,
    );
    const sat: number[] = new Array(6).fill(0);
    const sun: number[] = new Array(6).fill(0);

    return [mon, tue, wed, thu, fri, sat, sun];
  }
}
