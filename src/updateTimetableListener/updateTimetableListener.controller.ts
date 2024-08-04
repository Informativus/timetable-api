import { Controller } from '@nestjs/common';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { UpdateTimetableListener } from './updateTimetableListener.service';
import { GrpcMethod } from '@nestjs/microservices';
import { PostUpdateTimetable } from '../proto/timetable';
import { UpdateTimetableDto } from '../dto/timetable/UpdateTimetable/UpdateTimetable.dto';

@Controller()
export class UpdateTimetableListenerController {
  constructor(
    private readonly updateTimetableListener: UpdateTimetableListener,
  ) {}

  @GrpcMethod('UpdateTimetableListener', 'UpdateTimetable')
  async updateTimetable(request: PostUpdateTimetable): Promise<Empty> {
    return await this.updateTimetableListener.updateTimetable(
      this.getUpdateTimetableDto(request),
    );
  }

  getUpdateTimetableDto(request: PostUpdateTimetable): UpdateTimetableDto {
    return {
      periods: {
        period: request.periods.period.map((period) => ({
          name: period.name,
          starttime: period.starttime,
          endtime: period.endtime,
        })),
      },
      subjects: {
        subject: request.subjects.subject.map((subject) => ({
          id: subject.id,
          name: subject.name,
        })),
      },
      teachers: {
        teacher: request.teachers.teacher.map((teacher) => ({
          id: teacher.id,
          name: teacher.name,
        })),
      },
      classrooms: {
        classroom: request.classrooms.classroom.map((classroom) => ({
          id: classroom.id,
          short: classroom.short,
        })),
      },
      classes: {
        class: request.classes.class.map((item) => ({
          id: item.id,
          name: item.name,
        })),
      },
      groups: {
        group: request.groups.group.map((group) => ({
          id: group.id,
          name: group.name,
        })),
      },
      lessons: {
        lesson: request.lessons.lesson.map((lesson) => ({
          id: lesson.id,
          classids: lesson.classids,
          subjectid: lesson.subjectid,
          teacherids: lesson.teacherids,
          classroomids: lesson.classroomids,
          groupids: lesson.groupids,
        })),
      },
      cards: {
        card: request.cards.card.map((card) => ({
          lessonid: card.lessonid,
          period: card.period,
          weeks: card.weeks,
          days: card.days,
          classroomids: card.classroomids,
        })),
      },
    };
  }
}
