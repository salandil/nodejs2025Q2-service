import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return {
        id: user.id,
        message: 'User is created.',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const user = await this.userService.findUserByLogin(login);

    const isPasswordValid =
      user?.password && (await bcrypt.compare(password, user.password));

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid login or password');
    }

    return this.signToken({ userId: user.id, login });
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('There is no refresh token in body');
    }

    try {
      const userData = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
      return this.signToken(userData);
    } catch (error) {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }
  }

  signToken({ userId, login }: { userId: string; login: string }) {
    const accessToken = this.jwtService.sign(
      { userId, login },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      },
    );
    const refreshToken = this.jwtService.sign(
      { userId, login },
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      },
    );
    return { accessToken, refreshToken };
  }
}
