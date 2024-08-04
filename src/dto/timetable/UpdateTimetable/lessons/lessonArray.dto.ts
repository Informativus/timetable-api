import { IsString } from 'class-validator';

export class LessonArray {
  @IsString()
  id: string;

  @IsString()
  classids: string;

  @IsString()
  subjectid: string;

  @IsString()
  teacherids: string;

  @IsString()
  classroomids: string;

  @IsString()
  groupids: string;
}
