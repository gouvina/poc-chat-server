import { UserDto } from 'src/user/dto/user.dto';

export class AuthResponseDto {
  accessToken: string;
  user: UserDto;
}
