import { IsArray, IsNotEmpty, IsString} from 'class-validator';

export class CreateConversationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsString({ each: true })
  messages: string[];
}
