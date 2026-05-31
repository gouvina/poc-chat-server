# poc-chat-server

NestJS + TypeORM + PostgreSQL API for the chat POC. Copy `.env-example` to `.env`, create the database, set `DATABASE_URL`, then run `yarn start:dev`.

Conversation routes live under `/conversations`. Path `:id` values are PostgreSQL row UUIDs (returned on create), not MongoDB ObjectIds.
