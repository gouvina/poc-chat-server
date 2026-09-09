import { Type } from "class-transformer"
import { IsNotEmpty, IsString, ValidateNested } from "class-validator"
import { UserDto } from "src/models/user/dto/user.dto"

export class CreateQueryDto {
    @IsString()
    @IsNotEmpty()
    question!: string

    @ValidateNested()
    @Type(() => UserDto)
    user!: UserDto
}
