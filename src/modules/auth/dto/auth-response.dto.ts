import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user',
  })
  fullName: string;

  @ApiProperty({
    example: 'johnDoe',
    description: 'The username of the user',
  })
  userName: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token for accessing protected routes',
  })
  accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVQJ9...',
    description: 'JWT refresh token for obtaining a new access token',
  })
  refreshToken: string;

  constructor(
    fullName: string,
    userName: string,
    accessToken: string,
    refreshToken: string,
  ) {
    this.fullName = fullName;
    this.userName = userName;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
