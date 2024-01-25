import {
  IsString,
  IsUUID,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsJWT,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUp {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  readonly login: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/[\.\,\!\_]/, {
    message: 'Password must contain one of the following characters: . , ! _',
  })
  readonly password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  readonly fio: string;
}

export class SignUpResponse {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  readonly fio: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  readonly login: string;
}

export class SignIn {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  readonly login: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/[\.\,\!\_]/, {
    message: 'Password must contain one of the following characters: . , ! _',
  })
  readonly password: string;
}

export class SignInResponse {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly fio: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsJWT()
  readonly accessToken: string;
}

export class RefreshToken {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsJWT()
  readonly accessToken: string;
}
