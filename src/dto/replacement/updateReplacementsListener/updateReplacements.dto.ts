import { UpdateReplacementsDataDto } from './updateReplacementsData.dto';
import { IsValidDto } from '../../../validators/isValidDto.validator';

export class UpdateReplacementsDto {
  @IsValidDto(UpdateReplacementsDataDto, {
    message:
      'The date property must be a valid UpdateReplacementsDataDto object',
  })
  date: UpdateReplacementsDataDto;
}
