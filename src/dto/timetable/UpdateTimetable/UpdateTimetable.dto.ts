import { PeriodsData } from './periods/periodsData.dto';
import { IsValidDto } from 'src/validators/isValidDto.validator';
import { SubjectsData } from './subjects/subjectsData.dto';
import { TeachersData } from './teachers/teachersData.dto';
import { ClassroomsData } from './classrooms/classroomsData.dto';
import { ClassesData } from './classes/classesData.dto';
import { GroupsData } from './groups/groupsData.dto';
import { LessonsData } from './lessons/lessonsData.dto';
import { CardsData } from './cards/cardsData.dto';

export class UpdateTimetableDto {
  @IsValidDto(PeriodsData)
  periods: PeriodsData;

  @IsValidDto(SubjectsData)
  subjects: SubjectsData;

  @IsValidDto(TeachersData)
  teachers: TeachersData;

  @IsValidDto(ClassroomsData)
  classrooms: ClassroomsData;

  @IsValidDto(ClassesData)
  classes: ClassesData;

  @IsValidDto(GroupsData)
  groups: GroupsData;

  @IsValidDto(LessonsData)
  lessons: LessonsData;

  @IsValidDto(CardsData)
  cards: CardsData;
}
