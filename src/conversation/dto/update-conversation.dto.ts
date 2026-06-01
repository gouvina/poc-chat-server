import { IsArray, IsString, IsOptional } from 'class-validator';
import { MessageDto } from 'src/message/dto/message.dto';

export class UpdateConversationDto {

  @IsString()
  @IsOptional()
  title: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  messages: MessageDto[];
}
