# POC Chat Server

## Requirements

* Node.js
* npm
* PostgreSQL

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root based on `.env.example` and configure the PostgreSQL connection:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_NAME=your-database
```

Make sure PostgreSQL is running and the configured database exists.

## Run

Start the development server:

```bash
npm run start:dev
```

The server will run at:

```text
http://localhost:3000
```

Swagger API documentation is available at:

```text
http://localhost:3000/api
```
