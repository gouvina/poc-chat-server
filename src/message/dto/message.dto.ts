import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { SenderType } from "../enum/sender-type.enum";

export class MessageDto {
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    id!: string

    @IsString()
    content!: string

    @IsEnum(SenderType)
    sender!: SenderType
}
