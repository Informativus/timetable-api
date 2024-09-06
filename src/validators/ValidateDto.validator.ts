import { InternalServerErrorException, ValidationError } from '@nestjs/common';
import { validate } from 'class-validator';

export function ValidateDto(dto: any) {
  return function (
    target: any,
    propertyKey: string | symbol,
    paramIndex: number,
  ) {
    const originalMethod = target[propertyKey];

    target[propertyKey] = async function (...args: any[]) {
      const data = args[paramIndex];
      const instance = Object.assign(new dto(), data);
      const errors: ValidationError[] = await validate(instance);

      if (errors.length > 0) {
        throw new InternalServerErrorException('Validation failed');
      }

      return originalMethod.apply(this, args);
    };
  };
}
