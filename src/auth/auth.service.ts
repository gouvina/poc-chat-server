import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { comparePassword } from 'src/utils/hash.util';
import { CreateUserDto } from 'src//user/dto/create-user.dto';
import { UserDto } from 'src//user/dto/user.dto';
import { UserService } from 'src//user/user.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<LoginResponseDto> {
    const user = await this.userService.createUser(createUserDto);
    return this.buildAuthResponse(user);
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.findByEmail(
      loginDto.email,
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
  
      const user = await this.userService.getUser(payload.sub);
  
      if (!user) {
        throw new UnauthorizedException();
      }
  
      const accessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email
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
  }) {
    const accessPayload = {
      sub: user.id,
      email: user.email
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
  }): Promise<LoginResponseDto> {
    const tokens = await this.generateTokens(user);

    return {
      ...tokens,
      user: plainToInstance(UserDto, user),
    };
  }
}
