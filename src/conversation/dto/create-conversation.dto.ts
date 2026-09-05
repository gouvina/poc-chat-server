import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested} from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';

export class CreateConversationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsString({ each: true })
  messages: string[];

  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;
}
