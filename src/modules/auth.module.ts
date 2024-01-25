import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '../entities/auth.entity';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { Action } from '../entities/actions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Auth, Action])],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
