import { IsArray, IsString, IsOptional } from 'class-validator';

export class UpdateConversationDto {

  @IsString()
  @IsOptional()
  title: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  messages: string[];
}
