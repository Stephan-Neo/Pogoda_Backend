import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '../entities/auth.entity';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { Action } from '../entities/actions.entity';
import { WeatherController } from '../controllers/weather.controller';
import { WeatherService } from '../services/weather.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([User, Auth, Action]),
    HttpModule,
  ],
  controllers: [WeatherController],
  providers: [AuthService, UsersService, WeatherService],
})
export class WeatherModule {}
