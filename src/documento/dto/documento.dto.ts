import { IsNumber, IsString } from "class-validator";
import { RolloDto } from "src/rollo/dto/rollo.dto";

export class DocumentoDto {
    @IsNumber()
    id!: number

    @IsNumber()
    hoja?: number

    @IsNumber()
    calificacion?: number

    @IsString()
    version?: string

    @IsString()
    texto?: string

    rollo!: RolloDto
}