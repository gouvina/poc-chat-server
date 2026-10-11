import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { SenderType } from "../enum/sender-type.enum";
import { Expose } from "class-transformer";

export class MessageDto {
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    @Expose()
    id!: string

    @IsString()
    @Expose()
    content!: string

    @IsEnum(SenderType)
    @Expose()
    sender!: SenderType

    @IsDate()
    @Expose()
    createdAt!: Date
}
