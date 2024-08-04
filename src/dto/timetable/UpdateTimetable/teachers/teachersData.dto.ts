import { IsValidArrayDto } from 'src/validators/isValidArrayDto.validator';
import { TeacherArray } from './teachersArray.dto';

export class TeachersData {
  @IsValidArrayDto(TeacherArray)
  teacher: TeacherArray[];
}
