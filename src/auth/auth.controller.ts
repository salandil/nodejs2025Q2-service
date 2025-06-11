import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @HttpCode(StatusCodes.OK)
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @Post('refresh')
  @HttpCode(StatusCodes.OK)
  refresh(@Body() { refreshToken }: { refreshToken: string }) {
    return this.authService.refresh(refreshToken);
  }
}
