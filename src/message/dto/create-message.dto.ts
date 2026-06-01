import { IsNotEmpty, IsString } from "class-validator";
import { SenderType } from "../enum/SenderType";

export class CreateMessageDto {

    @IsString()
    @IsNotEmpty()
    content: string

    @IsString()
    @IsNotEmpty()
    sender: SenderType
}