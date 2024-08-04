import { IsValidArrayDto } from 'src/validators/isValidArrayDto.validator';
import { PeriodArray } from './periodArray.dto';

export class PeriodsData {
  @IsValidArrayDto(PeriodArray)
  period: PeriodArray[];
}
