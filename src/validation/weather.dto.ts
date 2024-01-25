import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  ValidateNested,
} from 'class-validator';

class Condition {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsString()
  icon: string;

  @ApiProperty()
  @IsNumber()
  code: number;
}

class Current {
  @ApiProperty()
  @IsNumber()
  last_updated_epoch: number;

  @ApiProperty()
  @IsString()
  last_updated: string;

  @ApiProperty()
  @IsNumber()
  temp_c: number;

  @ApiProperty()
  @IsNumber()
  temp_f: number;

  @ApiProperty()
  @IsBoolean()
  is_day: boolean;

  @ApiProperty({ type: Condition })
  @ValidateNested()
  condition: Condition;
}

class Location {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  region: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;
}

export class WeatherResponse {
  @ApiProperty({ type: Location })
  @ValidateNested()
  location: Location;

  @ApiProperty({ type: Current })
  @ValidateNested()
  current: Current;
}

export class WeatherQuery {
  @ApiProperty({ name: 'city', description: 'City', required: true })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ name: 'language', description: 'Language', required: false })
  language?: string;
}
