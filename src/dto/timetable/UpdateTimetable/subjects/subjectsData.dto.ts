import { SubjectArrayDto } from './subjectArray.dto';
import { IsValidArrayDto } from 'src/validators/isValidArrayDto.validator';

export class SubjectsData {
  @IsValidArrayDto(SubjectArrayDto)
  subject: SubjectArrayDto[];
}
