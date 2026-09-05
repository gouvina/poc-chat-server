import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";
import { UserDto } from "src/user/dto/user.dto";

export class ConversationDto {
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ValidateNested()
    @Type(() => UserDto)
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
