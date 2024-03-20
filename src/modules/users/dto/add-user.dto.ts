import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsPhoneNumber,
  IsAlphanumeric,
  Matches,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class AddUserDto {
  // userName
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

  //firstName
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

  // lastName
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

  // email
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  // password
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

  // phone
  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  @IsPhoneNumber()
  @Matches(/^[0-9]+$/)
  phone?: string;

  @IsOptional()
  @IsBoolean({ message: 'canLogin must be a boolean value' })
  canLogin?: boolean;
}
