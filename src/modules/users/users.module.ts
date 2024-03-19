import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UsersRepository } from './repositories/users-repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  // imports: [AuthModule, DatabaseModule],
  exports: [UsersService],
})
export class UsersModule {}