import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested} from 'class-validator';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';

export class CreateConversationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @ValidateNested()
  @Type(() => CreateMessageDto)
  firstMessage?: CreateMessageDto
}
