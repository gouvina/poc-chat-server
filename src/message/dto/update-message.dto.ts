import { IsOptional, IsString } from "class-validator";
import { SenderType } from "../enum/SenderType";

export class UpdateMessageDto {
    @IsOptional()
    sender?: SenderType
    
    @IsString()
    @IsOptional()
    content?: string
}
