import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RolloDto {

    @IsNumber()
    @IsNotEmpty()
    id!: number

    @IsString()
    nombre?: string

    @IsNumber()
    cantidad_documentos!: number
}