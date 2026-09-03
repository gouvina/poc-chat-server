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
    const user = await this.userService.createUser({...createUserDto, password: Buffer.from(createUserDto.password, 'base64').toString('utf-8')});
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
      Buffer.from(loginDto.password, 'base64').toString('utf-8'),
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
  
  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
  
      const user = await this.userService.findByEmailOrUsername(payload.email);
  
      if (!user) {
        throw new UnauthorizedException();
      }
  
      const accessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          username: user.username,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '15m',
        },
      );
  
      return {
        accessToken,
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(user: {
    id: string;
    email: string;
    username: string;
  }) {
    const accessPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };
  
    const refreshPayload = {
      sub: user.id,
    };
  
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessPayload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
  
      this.jwtService.signAsync(refreshPayload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);
  
    return {
      accessToken,
      refreshToken,
    };
  }

  private async buildAuthResponse(user: {
    id: string;
    email: string;
    username: string;
  }): Promise<AuthResponseDto> {
    const tokens = await this.generateTokens(user);

    return {
      ...tokens,
      user: plainToInstance(UserDto, user),
    };
  }
}
