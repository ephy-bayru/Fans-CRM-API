import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'john.doe@example.com or johnDoe',
    description: 'The email address or username of the user trying to log in.',
  })
  @IsString()
  @IsNotEmpty()
  emailOrUsername: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'The password of the user trying to log in.',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
