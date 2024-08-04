import { IsValidArrayDto } from 'src/validators/isValidArrayDto.validator';
import { LessonArray } from './lessonArray.dto';

export class LessonsData {
  @IsValidArrayDto(LessonArray)
  lesson: LessonArray[];
}
