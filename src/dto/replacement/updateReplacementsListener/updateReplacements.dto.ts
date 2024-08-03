import { IsUpdateReplacementsData } from 'src/validators/Replacements/isUpdateReplacementsDto.validator';
import { UpdateReplacementsDataDto } from './updateReplacementsData.dto';

export class UpdateReplacementsDto {
  @IsUpdateReplacementsData({ message: 'Invalid replacements data' })
  date: UpdateReplacementsDataDto;
}
