import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ReplacementDto } from './replacement.dto';
import { IsReplacementArray } from '../../validators/isReplacementArray.validator';

export class CreateReplacementDto {
  @IsBoolean()
  @IsNotEmpty()
  success: boolean;

  @IsReplacementArray({
    message: 'Replacements must be an array of valid ReplacementDto objects',
  })
  replacements: ReplacementDto[];
}
