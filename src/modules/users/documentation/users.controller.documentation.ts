import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AddUserDto } from './user.dto.documentation';
import { UserResponseDto } from '../dto/user-response.dto';

export function GetUserDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve a user by their ID',
      description:
        'Fetches a single user based on the provided unique identifier from the database.',
    }),
    ApiOkResponse({
      description: 'User has been retrieved successfully.',
      type: UserResponseDto,
    }),
    ApiNotFoundResponse({
      description: 'User with the given ID does not exist in the database.',
    }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}

export function CreateUserDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new user',
      description:
        'Registers a new user in the system with the provided data. All fields are required unless marked as optional.',
    }),
    ApiCreatedResponse({
      description: 'User has been created successfully.',
      type: AddUserDto,
    }),
    ApiBadRequestResponse({
      description: 'The provided data is invalid or incomplete.',
    }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
