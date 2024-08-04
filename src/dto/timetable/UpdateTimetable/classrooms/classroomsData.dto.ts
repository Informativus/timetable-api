import { IsValidArrayDto } from 'src/validators/isValidArrayDto.validator';
import { ClassroomArray } from './classroomArray.dto';

export class ClassroomsData {
  @IsValidArrayDto(ClassroomArray)
  classroom: ClassroomArray[];
}
