import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/modules/users/services/users.service';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { jwtConstants } from '../constants/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(identifier: string, password: string): Promise<any> {
    console.log('validation on progress...', identifier, password);
    const user = await this.usersService.findOne(identifier);
    if (!user) {
      throw new NotFoundException(
        `No user found for '${identifier}'. Please check the information and try again.`,
      );
    }

    if (!user.canLogin) {
      throw new UnauthorizedException(
        'Logging in is not allowed for this user.',
      );
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return user;
  }

  async login(identifier: string, password: string): Promise<AuthResponseDto> {
    const user = await this.validateUser(identifier, password);

    const payload = {
      sub: user.id,
      username: user.userName,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.accessTokenExpiration,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtConstants.refreshSecret,
      expiresIn: jwtConstants.refreshTokenExpiration,
    });

    return new AuthResponseDto(
      `${user.firstName} ${user.lastName}`,
      user.userName,
      accessToken,
      refreshToken,
    );
  }
}
