import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validate } from 'class-validator';
import { ReplacementsInfoDto } from '../../dto/replacement/updateReplacementsListener/replacementsInfo.dto';

@ValidatorConstraint({ async: true })
export class IsReplacementsInfoArrayConstraint
  implements ValidatorConstraintInterface
{
  async validate(replacementsInfo: any[]): Promise<boolean> {
    if (!Array.isArray(replacementsInfo)) {
      return false;
    }

    for (const replacement of replacementsInfo) {
      const instance = Object.assign(new ReplacementsInfoDto(), replacement);
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

export function IsReplacementsInfoArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsReplacementsInfoArrayConstraint,
    });
  };
}
