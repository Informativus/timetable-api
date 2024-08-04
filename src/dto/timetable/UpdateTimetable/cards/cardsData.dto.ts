import { IsValidArrayDto } from 'src/validators/isValidArrayDto.validator';
import { CardArray } from './cardArray.dto';

export class CardsData {
  @IsValidArrayDto(CardArray)
  card: CardArray[];
}
