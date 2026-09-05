import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { RolloDto } from "src/rollo/dto/rollo.dto"

export class CreateDocumentoDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number

    @IsNumber()
    hoja?: number

    @IsNumber()
    calificacion?: number

    @IsString()
    version?: string

    @IsString()
    texto?: string

    @IsNotEmpty()
    rollo!: RolloDto
}