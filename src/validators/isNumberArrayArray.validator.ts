import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsNumberArrayArrayConstraint
  implements ValidatorConstraintInterface {
  validate(value: number[][]): boolean {
    if (!Array.isArray(value)) {
      return false;
    }

    for (const arr of value) {
      if (!Array.isArray(arr)) {
        return false;
      }
      if (!arr.every((item) => typeof item === 'number')) {
        return false;
      }
    }

    return true;
  }

  defaultMessage() {
    return 'Each element in the array must be an array of numbers';
  }
}

export function IsNumberArrayArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNumberArrayArrayConstraint,
    });
  };
}
