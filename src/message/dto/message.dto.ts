import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class MessageDto {
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    id: string

    @IsString()
    content: string

    @IsString()
    sender: string

    @IsString()
    conversationId: string
}