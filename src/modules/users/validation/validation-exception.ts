import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(errors: ValidationError[]) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        errors: errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        })),
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
