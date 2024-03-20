import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Version,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginDocs } from '../documentation/auth.controller.documentation';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Version('1')
  @Public()
  @UseGuards(LocalAuthGuard)
  @LoginDocs()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req): Promise<AuthResponseDto> {
    return this.authService.login(req.user.identifier, req.user.password);
  }

  /*
  @Public()
  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto): Promise<AuthResponseDto> {
    return this.authService.refreshToken(body.refreshToken);
  }
  */
}
