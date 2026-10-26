import { Type } from "class-transformer"
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator"

export type ScoreFilter = { value: number, relation: "gt" | "lt" }

export class FilterDocumentDto {
    @IsOptional()
    @IsString()
    version?: string

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    rollId?: number

    @IsOptional()
    @IsString()
    text?: string

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(100)
    scoregt?: number

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(100)
    scorelt?: number
}
