import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  Version,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AddUserDto } from '../dto/add-user.dto';
import { UniqueUserValidationPipe } from '../pipes/unique-user-validation.pipe';
import {
  CreateUserDocs,
  GetUserDocs,
} from '../documentation/users.controller.documentation';
import { ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from '../dto/user-response.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @GetUserDocs()
  async getUser(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.usersService.getUserById(+id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Post('')
  @UsePipes(UniqueUserValidationPipe)
  @CreateUserDocs()
  async createUser(
    @Body() createUserDto: AddUserDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.createUser(createUserDto);
  }
}
