import { IsEnum, IsOptional, IsString } from "class-validator";
import { SenderType } from "../enum/sender-type.enum";

export class UpdateMessageDto {
    
    @IsString()
    @IsOptional()
    content?: string
    
    @IsEnum(SenderType)
    @IsOptional()
    sender?: SenderType
}
