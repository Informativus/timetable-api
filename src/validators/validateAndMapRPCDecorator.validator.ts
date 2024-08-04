import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Metadata, ServiceError, status } from '@grpc/grpc-js';

export function ValidateAndMapDtoGrpc(...dtoClasses: (new () => object)[]) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      console.log('Arguments before validation:', JSON.stringify(args));

      if (args.length !== dtoClasses.length) {
        const error: ServiceError = {
          code: status.INVALID_ARGUMENT,
          message: 'Number of arguments does not match number of DTOs',
          name: 'BadRequestError',
          details: 'Validation Error',
          metadata: new Metadata(),
        };
        throw error;
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

          throw {
            code: status.INVALID_ARGUMENT,
            message: `Validation failed for ${dtoClass.name}: ${errorMessages}`,
            name: 'BadRequestError',
            details: 'Validation Error',
            metadata: new Metadata(),
          };
        }

        args[i] = dto;
      }

      console.log('Arguments after validation:', args);
      return method.apply(this, args);
    };
  };
}
