import { IsArray, IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { MessageDto } from "src/message/dto/message.dto";

export class ConversationDto {
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    userId: string

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsArray()
    @IsString({ each: true })
    messages: MessageDto[];

    @IsDate()
    createdAt: Date;
}
