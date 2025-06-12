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
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly salt: number;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.salt = Number(process.env.CRYPT_SALT);
  }
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
    const passwordHash = await bcrypt.hash(createUserDto.password, this.salt);
    const user = {
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createUserDto,
      password: passwordHash,
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
    const user = await this.userRepository.findOne({
      where: { login },
      order: { createdAt: 'DESC' },
    });
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
    const passwordsEqual = await bcrypt.compare(
      updateUserDto.oldPassword,
      user.password,
    );
    if (!passwordsEqual) {
      throw new ForbiddenException(`Old password is incorrect`);
    }

    const passwordHash = await bcrypt.hash(
      updateUserDto.newPassword,
      this.salt,
    );
    const newUser = {
      ...user,
      password: passwordHash,
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
