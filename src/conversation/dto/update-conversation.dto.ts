import { IsArray, IsString, IsOptional } from 'class-validator';
import { Message } from 'src/message/message.entity';

export class UpdateConversationDto {

  @IsString()
  @IsOptional()
  title: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  messages: Message[];
}
