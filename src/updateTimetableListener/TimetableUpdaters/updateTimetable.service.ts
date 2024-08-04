import { Inject } from '@nestjs/common';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { SET_TIMETABLE_IN_STORAGE } from 'src/config/constants/constants';
import { PeriodsData } from 'src/dto/timetable/UpdateTimetable/periods/periodsData.dto';
import { UpdateTimetableDto } from 'src/dto/timetable/UpdateTimetable/UpdateTimetable.dto';
import { ISetTimetableInStorage } from 'src/timetable/Interfaces/ISetTimetableInStorage.intervace';
import { lessonsData } from './Types/lessonsData.type';
import { LessonArray } from 'src/dto/timetable/UpdateTimetable/lessons/lessonArray.dto';
import { SubjectsData } from 'src/dto/timetable/UpdateTimetable/subjects/subjectsData.dto';
import { TeachersData } from 'src/dto/timetable/UpdateTimetable/teachers/teachersData.dto';
import { CreateTimetableDto } from 'src/dto/timetable/CreateTimetable.dto';
import { CardArray } from 'src/dto/timetable/UpdateTimetable/cards/cardArray.dto';
import { weekData } from './Types/weekData.type';

export class UpdateTimetable {
  constructor(
    @Inject(SET_TIMETABLE_IN_STORAGE)
    private readonly setTimetableInStorage: ISetTimetableInStorage,
  ) {}

  async updateTimetable(
    updateTimetableDto: UpdateTimetableDto,
  ): Promise<Empty> {
    const times: string[][] = this.getTimes(updateTimetableDto.periods);

    for (const group of updateTimetableDto.classes.class) {
      const lessonsData: lessonsData = this.getLessons(
        group.id,
        updateTimetableDto,
      );

      const even: number[][] = this.getEven(
        lessonsData.lessonsIds,
        updateTimetableDto,
      );
      const odd: number[][] = this.getOdd(
        lessonsData.lessonsIds,
        updateTimetableDto,
      );

      const createTimetableData: CreateTimetableDto = {
        lessons: lessonsData.lessons,
        even: even,
        odd: odd,
        times: times,
      };
      console.log(createTimetableData);
    }
    return new Empty();
  }

  // Получение расписания
  getLessons(groupId: string, timetableData: UpdateTimetableDto): lessonsData {
    const lessonsArray: LessonArray[] = timetableData.lessons.lesson.filter(
      (lesson) => {
        return lesson.classids === groupId;
      },
    );

    const lessons: string[][] = [['', '', '', '']];

    for (const lesson of lessonsArray) {
      lessons.push([
        this.getSubjects(lesson.subjectid, timetableData.subjects),
        this.getClassroom(lesson.id, timetableData),
        this.getTeacher(lesson.teacherids, timetableData.teachers),
        '',
      ]);
    }

    return { lessonsIds: lessonsArray.map((lesson) => lesson.id), lessons };
  }

  getClassroom(lessonId: string, timetableData: UpdateTimetableDto): string {
    console.debug(lessonId);
    const card: CardArray = timetableData.cards.card.find(
      (card) => lessonId === card.lessonid,
    );

    console.debug('\n', card, '\n');

    return timetableData.classrooms.classroom.find(
      (classroom) => card.classroomids === classroom.id,
    ).short;
  }

  getSubjects(subjectId: string, subjectData: SubjectsData): string {
    return subjectData.subject.find((subject) => {
      return subject.id === subjectId;
    }).name;
  }

  getTeacher(teacherId: string, teacherData: TeachersData): string {
    const teacherName: string = teacherData.teacher.find((teacher) => {
      return teacher.id === teacherId;
    }).name;

    return teacherName.replace(' ', '.').replace(/\./g, '|');
  }

  // Заполнение расписания на четную неделю
  getEven(lessonsIds: string[], timetableData: UpdateTimetableDto): number[][] {
    const weekArray: weekData[] = [];
    const evenLessonsArray: CardArray[] = timetableData.cards.card.filter(
      (card) => {
        return lessonsIds.includes(card.lessonid) && card.weeks !== '01';
      },
    );

    lessonsIds.forEach((lessonId, index) => {
      const card: CardArray = evenLessonsArray.find((card) => {
        return card.lessonid === lessonId;
      });

      if (card) {
        weekArray.push({
          day: card.days,
          period: card.period,
          lessonNumber: index + 1,
        });
      }
    });

    const getSortedPeriods = (day: string) => {
      return weekArray
        .filter((week) => week.day === day)
        .sort((a, b) => parseInt(a.period) - parseInt(b.period))
        .map((week) => week.lessonNumber);
    };

    const mon: number[] = getSortedPeriods('10000');
    const tue: number[] = getSortedPeriods('01000');
    const wed: number[] = getSortedPeriods('00100');
    const thu: number[] = getSortedPeriods('00010');
    const fri: number[] = getSortedPeriods('00001');

    return [mon, tue, wed, thu, fri];
  }

  getOdd(lessonsIds: string[], timetableData: UpdateTimetableDto): number[][] {
    const weekArray: weekData[] = [];
    const evenLessonsArray: CardArray[] = timetableData.cards.card.filter(
      (card) => {
        return lessonsIds.includes(card.lessonid) && card.weeks !== '10';
      },
    );

    lessonsIds.forEach((lessonId, index) => {
      const card: CardArray = evenLessonsArray.find((card) => {
        return card.lessonid === lessonId;
      });

      if (card) {
        weekArray.push({
          day: card.days,
          period: card.period,
          lessonNumber: index + 1,
        });
      }
    });

    const getSortedPeriods = (day: string) => {
      return weekArray
        .filter((week) => week.day === day)
        .sort((a, b) => parseInt(a.period) - parseInt(b.period))
        .map((week) => week.lessonNumber);
    };

    const mon: number[] = getSortedPeriods('10000');
    const tue: number[] = getSortedPeriods('01000');
    const wed: number[] = getSortedPeriods('00100');
    const thu: number[] = getSortedPeriods('00010');
    const fri: number[] = getSortedPeriods('00001');

    return [mon, tue, wed, thu, fri];
  }

  getTimes(periods: PeriodsData): string[][] {
    const times: string[][] = [];

    periods.period.forEach((period) => {
      const startTime: string[] = period.starttime.split(':');
      const endTime: string[] = period.endtime.split(':');

      if (startTime.length === 2 && endTime.length === 2) {
        times.push([startTime[0], startTime[1], endTime[0], endTime[1]);
      } else {
        throw new Error('Invalid time format');
      }
    });

    return times;
  }
}
