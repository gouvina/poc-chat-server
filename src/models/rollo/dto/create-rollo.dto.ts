import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRolloDto {

    @IsNumber()
    @IsNotEmpty()
    id!: number

    @IsString()
    nombre?: string

    @IsNumber()
    cantidad_documentos!: number
}