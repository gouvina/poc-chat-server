import { IsArray, IsString } from 'class-validator';

export class CreateConversationDto {

  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  messages: string[];
}
