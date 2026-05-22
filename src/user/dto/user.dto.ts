import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class UserDto {
    
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}