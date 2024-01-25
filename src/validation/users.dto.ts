import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUser {
  @ApiProperty()
  @IsString()
  readonly fio: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly login: string;
}
