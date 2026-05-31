import { IsArray, IsNotEmpty, IsString} from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';

export class CreateConversationDto {
  @IsNotEmpty()
  user: UserDto;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsString({ each: true })
  messages: string[];
}
