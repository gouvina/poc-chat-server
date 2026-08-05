import { IsArray, IsNotEmpty, IsString} from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';

export class CreateConversationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsString({ each: true })
  messages: string[];

  @IsNotEmpty()
  user: UserDto;
}
