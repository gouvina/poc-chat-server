import { IsArray, IsString } from 'class-validator';

export class UpdateConversationDto {

  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  messages: string[];
}
