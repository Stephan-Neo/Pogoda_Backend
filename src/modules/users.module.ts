import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { User } from '../entities/user.entity';
import { Auth } from '../entities/auth.entity';
import { Action } from '../entities/actions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Auth, Action])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
