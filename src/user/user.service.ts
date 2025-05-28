import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { users } from '../data/database';
import { randomUUID } from 'node:crypto';
import { version } from 'node:os';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  formatUser(user: User) {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
  create(createUserDto: CreateUserDto) {
    const user = {
      id: randomUUID(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...createUserDto
    }
    users.push(user);
    return this.formatUser(user);
  }

  findAll() {  
    return users.map((user) => this.formatUser(user));
  }

  findOne(id: string) {
    const user = users.find(user => user.id === id)
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.formatUser(user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (users[index].password !== updateUserDto.oldPassword){
      throw new ForbiddenException(`Old password is incorrect`);
    }
    const newUser = {
      ...users[index],
      password: updateUserDto.newPassword,
      version: users[index].version + 1,
      updatedAt: Date.now(),
    }
    users[index] = newUser;
    return this.formatUser(newUser);
  }

  remove(id: string) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    users.splice(index, 1);
    return ;
  }
}
