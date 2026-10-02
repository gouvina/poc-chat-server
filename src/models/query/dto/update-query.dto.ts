import { IsNotEmpty, IsString } from "class-validator";

export class UpdateQueryDto {
    @IsString()
    @IsNotEmpty()
    name!: string
}
