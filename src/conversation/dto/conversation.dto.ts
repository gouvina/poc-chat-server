import { IsArray, IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { MessageDto } from "src/message/dto/message.dto";
import { UserDto } from "src/user/dto/user.dto";

export class ConversationDto {
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    id: string;

    user: UserDto

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsArray()
    @IsString({ each: true })
    messages: MessageDto[];

    @IsDate()
    createdAt: Date;
}
