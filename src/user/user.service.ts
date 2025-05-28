import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { users } from '../data/database';
import { randomUUID } from 'node:crypto';
import { version } from 'node:os';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user = {
      id: randomUUID(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...createUserDto
    }
    users.push(user);
    return user;
  }

  findAll() {
    return users;
  }

  findOne(id: string) {
    const user = users.find(user => user.id === id)
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const index = users.findIndex(user => user.id === id);
    const newUser = {
      ...users[index],
      password: updateUserDto.newPassword,
      version: users[index].version + 1,
      updatedAt: Date.now(),
    }
    users[index] = newUser;
    return newUser;
  }

  remove(id: string) {
    const index = users.findIndex(user => user.id === id);
    users.splice(index, 1);
    return ;
  }
}
