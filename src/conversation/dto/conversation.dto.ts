import { IsArray, IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class ConversationDto {
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsArray()
    @IsString({ each: true })
    messages: string[];

    @IsDate()
    createdAt: Date;
}