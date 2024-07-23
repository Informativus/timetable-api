import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { validateSync } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsStringArrayArrayConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string[][]): boolean {
    if (!Array.isArray(value)) {
      return false;
    }

    for (const arr of value) {
      if (!Array.isArray(arr)) {
        return false;
      }
      if (!arr.every((item) => typeof item === 'string')) {
        return false;
      }
    }

    return true;
  }
  defaultMessage() {
    return 'Each element in the array must be an array of strings';
  }
}

export function IsStringArrayArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStringArrayArrayConstraint,
    });
  };
}
