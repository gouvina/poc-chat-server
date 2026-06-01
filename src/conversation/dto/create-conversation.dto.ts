import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested} from 'class-validator';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { UserDto } from 'src/user/dto/user.dto';

export class CreateConversationDto {
  @IsNotEmpty()
  user: UserDto;

  @IsString()
  @IsNotEmpty()
  title: string;

  @ValidateNested()
  @Type(() => CreateMessageDto)
  firstMessage?: CreateMessageDto
}
