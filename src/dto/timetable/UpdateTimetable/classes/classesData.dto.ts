import { IsValidArrayDto } from 'src/validators/isValidArrayDto.validator';
import { ClassArray } from './classArray.dto';

export class ClassesData {
  @IsValidArrayDto(ClassArray)
  class: ClassArray[];
}
