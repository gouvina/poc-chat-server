import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Roll } from "./roll.entity";
import { RollDto } from "./dto/roll.dto";
import { plainToInstance } from "class-transformer";
import { CreateRollDto } from "./dto/create-roll.dto";

@Injectable()
export class RollService {
    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(Roll)
        private readonly rollRepository: Repository<Roll>
    ) {}

    async getRolls(): Promise<RollDto[]> {
        const rolls = await this.rollRepository.find()

        return plainToInstance(RollDto, rolls)
    }

    async getRoll(id: number): Promise<RollDto | null> {
        const roll = await this.rollRepository.findOne({ where: { id }})

        if (!roll) throw new NotFoundException()

        return plainToInstance(RollDto, roll)
    }

    async createRoll(dto: CreateRollDto): Promise<RollDto> {
        const existingRoll = await this.rollRepository.findOne({ where: { id: dto.id }})

        if (existingRoll) { throw new ConflictException('A roll with this Id already exists')}
        
        const roll = await this.rollRepository.save({
            id: dto.id,
            name: dto.name,
            number_documents: dto.number_documents
        })

        return plainToInstance(RollDto, roll)
    }
}
