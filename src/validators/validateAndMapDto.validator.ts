import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationError } from '@nestjs/common';

export async function validateAndMapDto<T extends object>(
  data: any[],
  dtoClass: new () => T,
): Promise<T[]> {
  const validatedResults: T[] = [];

  for (const item of data) {
    const dto = plainToInstance(dtoClass, item);
    const errors: ValidationError[] = await validate(dto);

    if (errors.length > 0) {
      const errorMessages: string = errors
        .map((err: ValidationError) =>
          Object.values(err.constraints).join(', '),
        )
        .join('; ');
      throw new Error(`Validation failed: ${errorMessages}`);
    }

    validatedResults.push(dto);
  }

  return validatedResults;
}
