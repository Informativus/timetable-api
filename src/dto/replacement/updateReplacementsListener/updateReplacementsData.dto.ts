import { IsString } from 'class-validator';
import { ReplacementsInfoDto } from './replacementsInfo.dto';
import { IsValidArrayDto } from '../../../validators/isValidArrayDto.validator';

export class UpdateReplacementsDataDto {
  @IsString()
  day: string;

  @IsString()
  month: string;

  @IsString()
  year: string;

  @IsValidArrayDto(ReplacementsInfoDto)
  subst: ReplacementsInfoDto[];
}
