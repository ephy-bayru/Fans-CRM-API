import { Injectable } from '@nestjs/common';
import { validateOrReject, ValidationError } from 'class-validator';
import { ValidationException } from '../validation/validation-exception';

@Injectable()
export class ValidationService {
  async validate(object: any): Promise<void> {
    try {
      await validateOrReject(object);
    } catch (errors) {
      if (
        Array.isArray(errors) &&
        errors.every((error) => error instanceof ValidationError)
      ) {
        throw new ValidationException(errors);
      } else {
        throw errors;
      }
    }
  }
}
