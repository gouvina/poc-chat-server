import { IsArray, IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { UserDto } from "src/user/dto/user.dto";

export class ConversationDto {
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    id: string;

    user: UserDto

    @IsString()
    userId: string

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsArray()
    @IsString({ each: true })
    messages: string[];

    @IsDate()
    createdAt: Date;
}
