import { Type } from 'class-transformer';
import { IsArray, IsString, IsOptional, ValidateNested } from 'class-validator';
import { UpdateMessageDto } from 'src/message/dto/update-message.dto';

export class UpdateConversationDto {

  @IsString()
  @IsOptional()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateMessageDto)
  @IsOptional()
  messages: UpdateMessageDto[];
}
