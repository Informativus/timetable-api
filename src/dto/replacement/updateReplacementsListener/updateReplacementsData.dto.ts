import { IsString } from 'class-validator';
import { ReplacementsInfoDto } from './replacementsInfo.dto';
import { IsReplacementsInfoArray } from '../../../validators/Replacements/isReplacementsInfoDto.validator';

export class UpdateReplacementsDataDto {
  @IsString()
  day: string;

  @IsString()
  month: string;

  @IsString()
  year: string;

  @IsReplacementsInfoArray()
  subst: ReplacementsInfoDto[];
}
