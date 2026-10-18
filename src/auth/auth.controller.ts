import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthenticatedRequest } from './types/authenticated-request.type';
import { Public } from './auth.constants';
import { CreateUserDto } from 'src/models/user/dto/create-user.dto';
import { UserDto } from 'src/models/user/dto/user.dto';
import type { Request, Response } from 'express';

const ACCESS_TOKEN_COOKIE = 'access_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  path: '/'
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) { }

  @Public()
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ user: UserDto }> {
    const { accessToken, refreshToken, user } = await this.authService.register(createUserDto);

    this.setAuthCookies(response, accessToken, refreshToken)

    return { user }
  }

  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ user: UserDto }> {
    const { accessToken, refreshToken, user } = await this.authService.login(loginDto)

    this.setAuthCookies(response, accessToken, refreshToken)

    return { user }
  }

  @Public()
  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    const refreshToken = request.cookies?.[REFRESH_TOKEN_COOKIE]

    if (!refreshToken) {
      response.clearCookie(ACCESS_TOKEN_COOKIE, cookieOptions)
      response.clearCookie(REFRESH_TOKEN_COOKIE, cookieOptions)

      throw new UnauthorizedException('Missing refresh token')
    }

    const { accessToken } = await this.authService.refresh(refreshToken)

    response.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
      ...cookieOptions,
      maxAge: this.getAccessTokenMaxAge()
    })

    return { message: 'Access token refreshed' }
  }

  @Public()
  @Post('logout')
  logout(
    @Res({ passthrough: true }) response: Response,
  ): { message: string } {
    response.clearCookie(ACCESS_TOKEN_COOKIE, cookieOptions)
    response.clearCookie(REFRESH_TOKEN_COOKIE, cookieOptions)

    return { message: 'Logged out successfully' }
  }

  @Get('me')
  async getProfile(@Req() request: AuthenticatedRequest): Promise<UserDto> {
    return this.authService.getProfile(request.user.sub);
  }

  private setAuthCookies(
    response: Response,
    accessToken: string,
    refreshToken: string
  ): void {
    response.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
      ...cookieOptions,
      maxAge: this.getAccessTokenMaxAge()
    })

    response.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      ...cookieOptions,
      maxAge: this.getRefreshTokenMaxAge()
    })
  }

  private getAccessTokenMaxAge(): number {
    return (
      Number(
        this.configService.getOrThrow<string>(
          'JWT_ACCESS_EXPIRES_IN',
        ),
      ) * 1000
    );
  }

  private getRefreshTokenMaxAge(): number {
    return (
      Number(
        this.configService.getOrThrow<string>(
          'JWT_REFRESH_EXPIRES_IN',
        ),
      ) * 1000
    );
  }
}
