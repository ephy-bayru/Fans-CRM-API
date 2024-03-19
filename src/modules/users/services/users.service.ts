import { Injectable, BadRequestException } from '@nestjs/common';
import { AddUserDto } from '../dto/add-user.dto';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users-repository';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUserById(id: number): Promise<UserResponseDto | null> {
    return this.usersRepository.read(id);
  }

  // This method assumes that all validations, including uniqueness checks, have been passed
  async createUser(userData: AddUserDto): Promise<UserResponseDto> {
    const newUser = await this.usersRepository.create(userData);
    return this.mapToUserResponseDto(newUser);
  }

  private mapToUserResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
    };
  }

  // Method for uniqueness checks to be used by UniqueUserValidationPipe
  async checkUserNameOrEmailUniqueness(
    userName: string,
    email: string,
  ): Promise<void> {
    const conflicts = await this.usersRepository.findUserNameOrEmail(
      userName,
      email,
    );
    if (conflicts.userName || conflicts.email) {
      let errorMessage = '';
      if (conflicts.userName) errorMessage += 'Username is already taken. ';
      if (conflicts.email) errorMessage += 'Email is already taken.';
      throw new BadRequestException(errorMessage.trim());
    }
  }
}
