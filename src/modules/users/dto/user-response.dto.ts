import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 30 })
  id: number;

  @ApiProperty({ example: 'Ephrem' })
  firstName: string;

  @ApiProperty({ example: 'Bayru' })
  lastName: string;

  @ApiProperty({ example: 'ephy' })
  userName: string;

  @ApiProperty({ example: 'ephybayru@gmail.com' })
  email: string;

  @ApiProperty({ example: true })
  canLogin: boolean;
}
