import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validate } from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsReplacementsInfoArrayConstraint
  implements ValidatorConstraintInterface
{
  private readonly type: any;

  constructor(type: any) {
    this.type = type;
  }
  async validate(values: any[], args: ValidationArguments): Promise<boolean> {
    const [type] = args.constraints;
    if (!Array.isArray(values)) {
      return false;
    }

    for (const value of values) {
      const instance = Object.assign(new type(), value);
      const errors = await validate(instance);
      if (errors.length > 0) {
        return false;
      }
    }

    return true;
  }

  defaultMessage() {
    return 'Each replacement in property must be a valid ReplacementsInfoDto object';
  }
}

export function IsValidArrayDto<T>(
  type: new () => T,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [type],
      validator: IsReplacementsInfoArrayConstraint,
    });
  };
}
