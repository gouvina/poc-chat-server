import { IsArray, IsNotEmpty, IsString} from 'class-validator';

export class CreateConversationDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsString({ each: true })
  messages: string[];
}
