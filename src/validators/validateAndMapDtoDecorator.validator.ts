import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { InternalServerErrorException } from '@nestjs/common';

export function ValidateAndMapDto(...dtoClasses: (new () => object)[]) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      console.log('Arguments before validation:', args);

      if (args.length !== dtoClasses.length) {
        throw new InternalServerErrorException(
          'Number of arguments does not match number of DTOs',
        );
      }

      for (let i = 0; i < args.length; i++) {
        const data = args[i];
        const dtoClass = dtoClasses[i];
        const dto = plainToInstance(dtoClass, data);
        const errors: ValidationError[] = await validate(dto);

        if (errors.length > 0) {
          const errorMessages: string = errors
            .map((error) => Object.values(error.constraints).join(', '))
            .join('; ');
          throw new InternalServerErrorException(
            `Validation failed for ${dtoClass.name}: ${errorMessages}`,
          );
        }

        args[i] = dto;
      }

      console.log('Arguments after validation:', args);
      return method.apply(this, args);
    };
  };
}
