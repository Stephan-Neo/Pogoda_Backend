import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { WeatherService } from '../services/weather.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WeatherResponse, WeatherQuery } from '../validation/weather.dto';

@ApiBearerAuth()
@Controller()
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @ApiTags('Weather')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Weather' })
  @ApiResponse({
    status: 201,
    description: 'weather',
    type: WeatherResponse,
  })
  @Get('/weather/:userId')
  async getWeather(
    @Param('userId') userId: string,
    @Query() query: WeatherQuery,
  ): Promise<WeatherResponse> {
    return await this.weatherService.getWeather(
      userId,
      query.city,
      query.language,
    );
  }
}
