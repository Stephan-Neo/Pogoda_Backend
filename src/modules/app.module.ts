import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { AuthModule } from './auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { UsersModule } from './users.module';
import { Auth } from '../entities/auth.entity';
import { JwtMiddleware } from '../middleware/jwt.middleware';
import { UsersController } from '../controllers/users.controller';
import { Action } from '../entities/actions.entity';
import { WeatherModule } from './weather.module';
import { WeatherController } from '../controllers/weather.controller';

const envs = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.PG_HOST || 'localhost',
      port: Number(envs.PG_PORT || 5432),
      username: envs.PG_USER || 'postgres',
      password: envs.PG_PASS || 'postgres',
      database: envs.PG_DB || 'postgres',
      entities: [User, Auth, Action],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    WeatherModule,
    TypeOrmModule.forFeature([User, Auth, Action]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(UsersController, WeatherController);
  }
}
