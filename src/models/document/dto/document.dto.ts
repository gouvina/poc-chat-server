import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { RollDto } from "src/models/roll/dto/roll.dto";

export class DocumentDto {
    @IsNumber()
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