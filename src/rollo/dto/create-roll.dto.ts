import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRollDto {

    @IsNumber()
    @IsNotEmpty()
    id!: number

    @IsString()
    name?: string

    @IsNumber()
    number_documents!: number
}