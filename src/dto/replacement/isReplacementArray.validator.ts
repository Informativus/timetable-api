import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { ReplacementDto } from './replacement.dto'; // замените на правильный путь к вашему ReplacementDto
import { validateSync } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsReplacementArrayConstraint
  implements ValidatorConstraintInterface
{
  validate(replacements: any[]) {
    if (!Array.isArray(replacements)) {
      return false;
    }

    for (const replacement of replacements) {
      const errors = validateSync(
        Object.assign(new ReplacementDto(), replacement),
      );
      if (errors.length > 0) {
        return false;
      }
    }

    return true;
  }

  defaultMessage() {
    return 'Each replacement in $property must be a valid ReplacementDto object';
  }
}

export function IsReplacementArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsReplacementArrayConstraint,
    });
  };
}
