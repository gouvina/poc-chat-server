import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"
import { RollDto } from "src/models/roll/dto/roll.dto"

export class CreateDocumentDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number

    @IsNumber()
    page?: number

    @IsNumber()
    score?: number

    @IsString()
    version?: string

    @IsString()
    text?: string

    @ValidateNested()
    @Type(() => RollDto)
    roll!: RollDto
}