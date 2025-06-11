import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  formatUser(user: User) {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
  }
  async create(createUserDto: CreateUserDto) {
    const user = {
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createUserDto,
    };
    const newUser = await this.userRepository.save(user);
    return this.formatUser(newUser);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => this.formatUser(user));
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    return this.formatUser(user);
  }

  async findUserByLogin(login: string) {
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) {
      throw new NotFoundException(`User with login: ${login} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException(`Old password is incorrect`);
    }
    const newUser = {
      ...user,
      password: updateUserDto.newPassword,
      version: user.version + 1,
      updatedAt: new Date(),
    };
    const updatedUser = await this.userRepository.save(newUser);
    return this.formatUser(updatedUser);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    await this.userRepository.delete(id);
    return;
  }
}
