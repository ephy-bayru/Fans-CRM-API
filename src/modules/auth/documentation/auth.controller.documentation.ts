import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { LoginRequestDto } from '../dto/login.dto';

export function LoginDocs() {
  return applyDecorators(
    ApiTags('Auth'),
    ApiOperation({
      summary: 'User Login',
      description:
        'Handles user authentication, returning JWT access and refresh tokens upon successful login.',
    }),
    ApiOkResponse({
      description:
        'Authenticated successfully. Returns the access and refresh JWT tokens along with user details.',
      type: AuthResponseDto,
    }),
    ApiBadRequestResponse({
      description:
        'Invalid request data. The body does not match the expected format.',
    }),
    ApiUnauthorizedResponse({
      description:
        'Authentication failed due to invalid credentials or missing authentication details.',
    }),
    ApiBody({
      description:
        'The required email/username and password for authentication.',
      type: LoginRequestDto,
      examples: {
        correctFormat: {
          value: {
            emailOrUsername: 'john.doe@example.com or johnDoe',
            password: 'Password123!',
          },
        },
      },
    }),
  );
}
