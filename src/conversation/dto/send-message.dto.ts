import { IsOptional, IsString } from 'class-validator';

export class SendMessageDto {
  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
