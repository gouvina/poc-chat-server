import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { SenderType } from "../enum/SenderType";

export class MessageDto {
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    id: string

    @IsString()
    content: string

    @IsString()
    sender: SenderType
}
