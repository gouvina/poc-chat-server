import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { SenderType } from "../enum/sender-type.enum";

export class CreateMessageDto {
    
    @IsString()
    @IsNotEmpty()
    content!: string

    @IsEnum(SenderType)
    @IsNotEmpty()
    sender!: SenderType

}
