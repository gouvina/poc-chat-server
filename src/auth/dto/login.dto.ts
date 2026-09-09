import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { UserDto } from 'src//user/dto/user.dto';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  password!: string;
}

export class LoginResponseDto {
  accessToken!: string;

  @ValidateNested()
  @Type(() => UserDto)
  user!: UserDto;
}
