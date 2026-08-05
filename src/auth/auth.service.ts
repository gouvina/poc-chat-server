import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { comparePassword } from 'src/user/password.util';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    const user = await this.userService.createUser(createUserDto);
    return this.buildAuthResponse(user);
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userService.findByEmailOrUsername(
      loginDto.identifier,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await comparePassword(
      loginDto.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.buildAuthResponse(user);
  }

  async getProfile(userId: string): Promise<UserDto> {
    const user = await this.userService.getUser(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  private async buildAuthResponse(user: {
    id: string;
    email: string;
    username: string;
  }): Promise<AuthResponseDto> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: plainToInstance(UserDto, user),
    };
  }
}
