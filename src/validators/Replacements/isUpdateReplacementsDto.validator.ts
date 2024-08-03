import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validate } from 'class-validator';
import { UpdateReplacementsDataDto } from '../../dto/replacement/updateReplacementsListener/updateReplacementsData.dto';

@ValidatorConstraint({ async: true })
export class IsUpdateReplacementsDataDtoConstraint
  implements ValidatorConstraintInterface
{
  async validate(replacementsData: any): Promise<boolean> {
    const instance = Object.assign(
      new UpdateReplacementsDataDto(),
      replacementsData,
    );

    const errors = await validate(instance);

    if (errors.length > 0) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return 'Each replacement in property must be a valid UpdateReplacementsDataDto object';
  }
}

export function IsUpdateReplacementsData(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUpdateReplacementsDataDtoConstraint,
    });
  };
}
