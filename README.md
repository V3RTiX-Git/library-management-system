# Library Management System

A backend library management system built using NestJS, TypeScript, Prisma ORM and PostgreSQL.

## Technologies

- Node.js
- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM

## Project Structure

```text
library-management-system/
├── api/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── prisma/
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env.example
│   └── package.json
└── README.md
```

## Database Models

The database contains four main components:

- **User:** Stores library users and their roles.
- **Role:** An enum defining PATRON and LIBRARIAN.
- **Genre:** Stores book genres.
- **Book:** Stores book information and references its genre.

## Schema Decisions

The Book model references Genre through a foreign key (`genreId`) rather than embedding genre information directly into each book.

This design follows relational database principles and avoids unnecessary duplication of data. Multiple books can belong to the same genre, while the genre information is stored only once in the Genre table.

The relationship is implemented using Prisma's `@relation` attribute, which connects the `genreId` foreign key in Book to the `id` primary key in Genre.

This makes it easier to manage genres independently, maintain data consistency and retrieve related books through database relationships.

## Database Migrations

The project uses Prisma Migrate to manage database schema changes.

Run:

```bash
npx prisma migrate dev --name init
```

## Database Seeding

The seed script inserts four genres and twenty sample books.

Run:

```bash
npx tsx prisma/seed.ts
```

## Running the Application

Navigate to the API directory:

```bash
cd api
npm install
npm run start:dev
```

Ensure a valid DATABASE_URL is configured in the local `.env` file before running the application.

## Configuration

Copy `.env.example` to `.env` and provide your own PostgreSQL connection string.

Never commit real database credentials.
