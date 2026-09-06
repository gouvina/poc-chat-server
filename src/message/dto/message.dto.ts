import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { SenderType } from "../enum/SenderType";

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
