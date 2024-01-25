import {
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser, User } from '../entities/user.entity';
import { Auth } from '../entities/auth.entity';
import { Action } from '../entities/actions.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Action)
    private actionsRepository: Repository<Action>,
  ) {}

  async createUser(fio: string, password: string, login): Promise<IUser> {
    const user = await this.usersRepository.create({
      fio,
      password,
      login,
    });
    return (await this.usersRepository.save(user)).transform();
  }

  async updateUser(id: string, fio?: string, login?: string): Promise<IUser> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new UnauthorizedException('Not Found User');
    }

    const userByFio = await this.usersRepository.findOne({
      where: {
        fio,
      },
    });
    if (userByFio) {
      throw new HttpException('This Login Employed', 408);
    }

    Object.assign(user, {
      fio,
      login,
    });
    return (await this.usersRepository.save(user)).transform();
  }

  async deleteUser(id: string): Promise<IUser | null> {
    const user = await this.usersRepository.findOneBy({
      id: id,
    });
    if (!user) {
      throw new HttpException('Not Found User By this id', 404);
    }

    const auth = await this.authRepository.findOneBy({
      userId: user.id,
    });
    if (auth) {
      await this.authRepository.remove(auth);
    }

    await this.actionsRepository.delete({
      userId: user.id,
    });

    return (await this.usersRepository.remove(user)).transform();
  }

  async findAll(): Promise<IUser[]> {
    return (await this.usersRepository.find()).map((item) => item.transform());
  }

  async findOne(id: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByFio(fio: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({
      fio: fio,
    });
  }

  async findByLogin(login: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({
      login: login,
    });
  }
}
