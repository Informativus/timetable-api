import { UpdateTimetableDto } from '../../../dto/timetable/UpdateTimetable/UpdateTimetable.dto';
import { lessonsData } from '../Types/lessonsData.type';
import { LessonArray } from '../../../dto/timetable/UpdateTimetable/lessons/lessonArray.dto';
import { CardArray } from '../../../dto/timetable/UpdateTimetable/cards/cardArray.dto';
import { SubjectsData } from '../../../dto/timetable/UpdateTimetable/subjects/subjectsData.dto';
import { TeachersData } from '../../../dto/timetable/UpdateTimetable/teachers/teachersData.dto';
import { subgroupIds } from '../Types/subgroupIds.type';

export class LessonCreator {
  getLessons(
    groupId: string,
    timetableData: UpdateTimetableDto,
    subgroups: subgroupIds[],
  ): lessonsData {
    console.log(subgroups);
    const lessonsArray: LessonArray[] = timetableData.lessons.lesson.filter(
      (lesson) => {
        return (
          lesson.classids === groupId &&
          subgroups.some((subgroup) => subgroup.subgroupIds === lesson.groupids)
        );
      },
    );

    console.log(lessonsArray);

    const subjectNames: Set<string> = new Set();
    const lessonsValidIds: string[] = [];
    const repeatIds: any = {};

    const lessons: string[][] = [['', '', '', '']];

    for (const lesson of lessonsArray) {
      const subjects: string = this.getSubjects(
        lesson.subjectid,
        timetableData.subjects,
      );

      if (subjectNames.has(subjects)) {
        const subjectIds: string[] = timetableData.subjects.subject
          .filter((sub) => sub.name === subjects)
          .map((sub) => sub.id);

        const lessonsIds: string[] = lessonsArray
          .filter((item) => subjectIds.includes(item.subjectid))
          .map((item) => item.id);

        repeatIds[lesson.id] =
          lessonsValidIds.indexOf(
            lessonsIds.find((item) => lessonsValidIds.includes(item)),
          ) + 1;

        continue;
      }

      subjectNames.add(subjects);
      lessonsValidIds.push(lesson.id);

      lessons.push([
        subjects,
        this.getClassroom(lesson.id, timetableData),
        this.getTeacher(lesson.teacherids, timetableData.teachers),
        '',
      ]);
    }

    return {
      lessonsAllIds: lessonsArray.map((lesson) => lesson.id),
      lessonsValidIds,
      repeatIds,
      lessons,
    };
  }

  getClassroom(lessonId: string, timetableData: UpdateTimetableDto): string {
    const card: CardArray = timetableData.cards.card.find(
      (card) => lessonId === card.lessonid,
    );

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
}
