import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsPhoneNumber,
  IsAlphanumeric,
  Matches,
} from 'class-validator';

export class AddUserDto {
  @ApiProperty({
    example: 'johnDoe123',
    description:
      'Username must be unique, contain only letters and numbers, between 3 and 20 characters.',
  })
  @IsString({
    message: 'Username is invalid. Please use only text characters.',
  })
  @IsNotEmpty({ message: 'Username is required' })
  @IsAlphanumeric('en-US', {
    message: 'Username must contain only letters and numbers',
  })
  @MinLength(3, {
    message: 'Username is too short. It should be at least 3 characters long.',
  })
  @MaxLength(20, {
    message: 'Username is too long. It should not exceed 20 characters.',
  })
  userName: string;

  @ApiProperty({
    example: 'John',
    description: 'First name of the user, between 2 and 50 characters.',
  })
  @IsString({
    message: 'First name is invalid. Please use only text characters.',
  })
  @IsNotEmpty({ message: 'First name is required' })
  @MinLength(2, {
    message:
      'First name is too short. It should be at least 2 characters long.',
  })
  @MaxLength(50, {
    message: 'First name is too long. It should not exceed 50 characters.',
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user, between 2 and 50 characters.',
  })
  @IsString({
    message: 'Last name is invalid. Please use only text characters.',
  })
  @IsNotEmpty({ message: 'Last name is required' })
  @MinLength(2, {
    message: 'Last name is too short. It should be at least 2 characters long.',
  })
  @MaxLength(50, {
    message: 'Last name is too long. It should not exceed 50 characters.',
  })
  lastName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description:
      'Unique email address of the user. It must be valid and unique.',
  })
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    example: 'SecurePassword123!',
    description:
      'Password with at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, {
    message: 'Password is too short. It should be at least 8 characters long.',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password too weak. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password: string;

  @ApiProperty({
    example: '+1234567890',
    required: false,
    description:
      'Phone number of the user. It must be valid. This field is optional.',
  })
  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  @Matches(/^[0-9]+$/, { message: 'Phone number must contain only digits.' })
  phone?: string;
}
