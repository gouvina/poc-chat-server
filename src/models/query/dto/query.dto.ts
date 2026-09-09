import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";
import { DocumentDto } from "src/models/document/dto/document.dto";
import { UserDto } from "src/models/user/dto/user.dto";

export class QueryDto {
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    id!: string

    @IsString()
    @IsNotEmpty()
    question!: string

    @IsString()
    answer?: string

    @ValidateNested()
    @Type(() => UserDto)
    user!: UserDto

    @ValidateNested()
    @Type(() => DocumentDto)
    documents?: DocumentDto
}
