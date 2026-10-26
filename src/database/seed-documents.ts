import 'dotenv/config'
import { DataSource } from "typeorm"
import { faker } from "@faker-js/faker"
import { Document } from "src/entities/document.entity"
import { Roll } from "src/entities/roll.entity"
import { Query } from "src/entities/query.entity"
import { User } from "src/entities/user.entity"
import { Conversation } from 'src/entities/conversation.entity'
import { Message } from 'src/entities/message.entity'

const BATCH_SIZE = 100
const DOCUMENT_COUNT = 500

const versions = ["v1", "v2", "v3", "v4", "v5"]

const keywords = [
    "contract",
    "invoice",
    "agreement",
    "report",
    "payment",
    "customer",
    "project",
    "financial",
    "legal",
    "technical",
]

async function seedDocuments() {
    const dataSource = new DataSource({
        type: "postgres",
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABSE_PORT ?? 5432),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [Document, Roll, Query, User, Conversation, Message],
        synchronize: false
    })

    await dataSource.initialize()

    try {
        const documentRepository = dataSource.getRepository(Document)
        const rollRepository = dataSource.getRepository(Roll)

        await dataSource
            .createQueryBuilder()
            .delete()
            .from("documents_queries_queries")
            .execute()

        await documentRepository
            .createQueryBuilder()
            .delete()
            .from("documents")
            .execute()

        const rolls = await rollRepository.find()

        if (rolls.length === 0) {
            throw new Error(
                "No rolls found. Create some rolls before seeding documents."
            )
        }

        const highestId = await documentRepository
            .createQueryBuilder("document")
            .select("MAX(document.id)", "max")
            .getRawOne<{ max: string | null }>()

        let nextId = Number(highestId?.max ?? 0) + 1

        const documents: Document[] = []

        for (let i = 0; i < DOCUMENT_COUNT; i++) {
            const documentKeywords = faker.helpers.arrayElements(keywords, { min: 1, max: 4 })

            const document = documentRepository.create({
                id: nextId++,
                page: faker.number.int({ min: 1, max: 100 }),
                score: i % 101,
                version: versions[i % versions.length],
                text: `${documentKeywords.join(", ")}: ${faker.lorem.paragraphs(2)} ${faker.lorem.sentence()}`,
                roll: rolls[i % rolls.length]
            })

            documents.push(document)
        }

        for (let i = 0; i < documents.length; i += BATCH_SIZE) {
            await documentRepository.save(
                documents.slice(i, i + BATCH_SIZE)
            )
        }

        for (const roll of rolls) {
            const count = await documentRepository.count({
                where: { roll: { id: roll.id } }
            })

            await rollRepository.update(roll.id, {
                number_documents: count
            })
        }

        console.log(`Succesfully created ${DOCUMENT_COUNT} documents`)
    } finally {
        await dataSource.destroy()
    }
}

seedDocuments().catch((error) => {
    console.error("Failed to seed documents:", error)
    process.exitCode = 1
})
