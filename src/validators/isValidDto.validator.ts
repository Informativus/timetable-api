import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validate } from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsValidDtoConstraint implements ValidatorConstraintInterface {
  private readonly type: any;

  constructor(type: any) {
    this.type = type;
  }

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [type] = args.constraints;
    if (!value) {
      return false;
    }

    const instance = Object.assign(new type(), value);
    const errors = await validate(instance);

    return errors.length === 0;
  }

  defaultMessage() {
    return 'The object is not a valid instance of the specified DTO';
  }
}

export function IsValidDto<T>(
  type: new () => T,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [type],
      validator: IsValidDtoConstraint,
    });
  };
}

