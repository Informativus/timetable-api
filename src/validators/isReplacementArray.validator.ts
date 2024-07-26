import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ReplacementDto } from '../dto/replacement/replacement.dto';
import { validate } from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsReplacementArrayConstraint
  implements ValidatorConstraintInterface
{
  async validate(replacements: any[]): Promise<boolean> {
    if (!Array.isArray(replacements)) {
      return false;
    }

    for (const replacement of replacements) {
      const instance = Object.assign(new ReplacementDto(), replacement);
      const errors = await validate(instance);
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
