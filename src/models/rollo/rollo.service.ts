import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { RolloDto } from "./dto/rollo.dto";
import { plainToInstance } from "class-transformer";
import { CreateRolloDto } from "./dto/create-rollo.dto";
import { Rollo } from "src/entities/rollo.entity";

@Injectable()
export class RolloService {
    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(Rollo)
        private readonly rolloRepository: Repository<Rollo>
    ) {}

    async getRollos(): Promise<RolloDto[]> {
        const rollos = await this.rolloRepository.find()

        return plainToInstance(RolloDto, rollos)
    }

    async getRollo(id: number): Promise<RolloDto | null> {
        const rollo = await this.rolloRepository.findOne({ where: { id }})

        if (!rollo) throw new NotFoundException()

        return plainToInstance(RolloDto, rollo)
    }

    async createRollo(dto: CreateRolloDto): Promise<RolloDto> {
        const rollo = await this.dataSource.transaction(async manager => {
            const rollo = await manager.create(Rollo, {
                id: dto.id,
                nombre: dto.nombre,
                cantidad_documentos: dto.cantidad_documentos,
            })

            await manager.save(rollo)

            return rollo
        })

        return plainToInstance(RolloDto, rollo)
    }
}