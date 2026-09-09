import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"
import { RolloDto } from "src/models/rollo/dto/rollo.dto"

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

    @ValidateNested()
    @Type(() => RolloDto)
    rollo!: RolloDto
}