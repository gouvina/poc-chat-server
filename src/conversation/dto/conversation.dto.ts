import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";
import { MessageDto } from "src/message/dto/message.dto";
import { UserDto } from "src/user/dto/user.dto";

export class ConversationDto {
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    id: string;
    
    @IsString()
    @IsNotEmpty()
    title: string;

    @ValidateNested()
    @Type(() => UserDto)
    user: UserDto

    @ValidateNested()
    @Type(() => MessageDto)
    messages: MessageDto[];

    @IsDate()
    createdAt: Date;
}
