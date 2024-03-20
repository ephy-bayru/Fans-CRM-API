import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    example: 'user@example.com or username',
    description:
      'The email or username of the user trying to log in. Supports both email address and username.',
  })
  @IsString()
  @IsNotEmpty({ message: 'Email or Username is required.' })
  emailOrUsername: string;

  @ApiProperty({
    example: 'Password123!',
    description: "The password associated with the user's account.",
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
}
