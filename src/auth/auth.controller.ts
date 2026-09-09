import {
  Body,
  Controller,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RefreshTokenDto, RefreshResponseDto } from './dto/refresh.dto';
import { AuthenticatedRequest } from './types/authenticated-request.type';
import { CreateUserDto } from 'src//user/dto/create-user.dto';
import { UserDto } from 'src//user/dto/user.dto';
import { Public } from './auth.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<LoginResponseDto> {
    return this.authService.register(createUserDto);
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshTokenDto): Promise<RefreshResponseDto> {
    return this.authService.refresh(refreshDto.refreshToken);
  }

  @Get('me')
  async getProfile(@Req() request: AuthenticatedRequest): Promise<UserDto> {
    return this.authService.getProfile(request.user.sub);
  }
}
