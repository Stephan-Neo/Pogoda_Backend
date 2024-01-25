import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SignUpResponse } from '../validation/auth.dto';
import { UsersService } from '../services/users.service';
import { IUser } from '../entities/user.entity';
import { UpdateUser } from '../validation/users.dto';
import { AccessGuard } from '../guards/access.guard';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiTags('Users')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get User by Id' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 201,
    description: 'user',
    type: SignUpResponse,
  })
  @UseGuards(AccessGuard)
  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<IUser> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new UnauthorizedException('Not Found User');
    }
    return user.transform();
  }

  @ApiTags('Users')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update User by Id' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UpdateUser })
  @ApiResponse({
    status: 201,
    description: 'user',
    type: SignUpResponse,
  })
  @UseGuards(AccessGuard)
  @Put(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUser,
  ): Promise<IUser> {
    return await this.userService.updateUser(
      id,
      updateUserDto?.fio,
      updateUserDto?.login,
    );
  }

  @ApiTags('Users')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete User by Id' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 201,
    description: 'user',
    type: SignUpResponse,
  })
  @UseGuards(AccessGuard)
  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<IUser> {
    return await this.userService.deleteUser(id);
  }
}
