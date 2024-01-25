import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../entities/auth.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Action } from '../entities/actions.entity';
import { WeatherResponse } from '../validation/weather.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Action)
    private actionsRepository: Repository<Action>,

    private readonly httpService: HttpService,

    private configService: ConfigService,
  ) {}
  async getWeather(
    userId: string,
    city: string,
    language?: string,
  ): Promise<WeatherResponse | undefined> {
    const apiKey = this.configService.get<string>('WEATHER_API_KEY');
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnauthorizedException('Not Found User');
    }
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    try {
      const response = await this.httpService
        .get<WeatherResponse>(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=${language}`,
        )
        .toPromise();
      const actionsCreated = await this.actionsRepository.create({
        userId: user.id,
        actionTime: `${currentTimeInSeconds}`,
        requestResult: response.status,
        tempC: `${response.data.current.temp_c}`,
      });
      await this.actionsRepository.save(actionsCreated);
      return response.data;
    } catch (error) {
      const actionsCreated = await this.actionsRepository.create({
        userId: user.id,
        actionTime: `${currentTimeInSeconds}`,
        requestResult: error.response.status,
        tempC: 'N/A',
      });
      await this.actionsRepository.save(actionsCreated);
      return error;
    }
  }
}
