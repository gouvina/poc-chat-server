import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested} from 'class-validator';
import { CreateMessageDto } from 'src/models/message/dto/create-message.dto';
import { UserDto } from 'src/models/user/dto/user.dto';


export class CreateConversationDto {
  @ValidateNested()
  @Type(() => UserDto)
  user!: UserDto;
  
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ValidateNested()
  @Type(() => CreateMessageDto)
  firstMessage?: CreateMessageDto

}
