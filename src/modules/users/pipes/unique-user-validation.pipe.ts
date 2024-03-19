import { PipeTransform, Injectable } from '@nestjs/common';
import { UsersService } from '../services/users.service';

interface UserValidationDTO {
  userName: string;
  email: string;
}

@Injectable()
export class UniqueUserValidationPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}

  async transform(value: UserValidationDTO): Promise<UserValidationDTO> {
    const { userName, email } = value;

    await this.usersService.checkUserNameOrEmailUniqueness(userName, email);

    return value;
  }
}
