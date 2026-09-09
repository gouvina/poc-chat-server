import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RollDto {

    @IsNumber()
    @IsNotEmpty()
    id!: number

    @IsString()
    name?: string

    @IsNumber()
    number_documents!: number
}