import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { validateSync } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsGroupArrayConstraint implements ValidatorConstraintInterface {
  validate(getGroupDto: GetGroupDto[]) {
    if (!Array.isArray(getGroupDto)) {
      return false;
    }

    for (const group of getGroupDto) {
      const errors = validateSync(Object.assign(new GetGroupDto(), group));
      if (errors.length > 0) {
        return false;
      }
    }

    return true;
  }
  defaultMessage(): string {
    return 'Each group in $property must be a valid GetGroupDto object';
  }
}

export function IsGroupArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsGroupArrayConstraint,
    });
  };
}
