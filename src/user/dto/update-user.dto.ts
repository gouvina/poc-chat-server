import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '../user.constants';

export class UpdateUserDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsOptional()
  @MinLength(USERNAME_MIN_LENGTH)
  @MaxLength(USERNAME_MAX_LENGTH)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })
  username?: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsOptional()
  @MaxLength(100)
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(PASSWORD_MIN_LENGTH, {
    message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
  })
  @MaxLength(PASSWORD_MAX_LENGTH, {
    message: `Password must be at most ${PASSWORD_MAX_LENGTH} characters long`,
  })
  password?: string;
}
