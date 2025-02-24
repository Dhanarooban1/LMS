# Library Management System

## Description
This project is a full-stack Library Management System that allows users to manage book records, track borrowings, and handle user accounts. The backend uses Prisma as an ORM, Supabase for database management, and PostgreSQL for data storage. The frontend is built with React and styled using Tailwind CSS.

## Features
- Admin management 
- Member registration with membership tracking
- Book management (add, update, delete books)
- Borrow and return book functionality
- Real-time search and filter options
- Responsive design
- Error handling and loading states

## Tech Stack
- **Backend:**
  - Prisma (ORM)
  - Supabase (Database management)
  - PostgreSQL
  - Node.js
- **Frontend:**
  - React
  - Tailwind CSS

## Prerequisites
- Node.js and npm
- Supabase account and project setup
- PostgreSQL installed locally or hosted

## Installation

### Backend Setup
1. Clone the repository
```bash
git clone https://github.com/Dhanarooban1/LMS.git
cd Backend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables in `.env`
```
DATABASE_URL= .env
DIRECT_URL= .env 
```

4. Initialize Prisma and generate client
```bash
npx prisma init
npx prisma generate
```

5. Migrate database
```bash
npx prisma migrate dev
```

### Frontend Setup
1. Navigate to the frontend directory
```bash
cd Frontend
```

2. Install dependencies
```bash
npm install
```

## Database Schema
The application uses the following schema:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model Admin {
  admin_id    Int    @id @default(autoincrement())
  admin_name  String
  admin_email String @unique
  password    String
}

model Membership {
  membership_id Int    @id @default(autoincrement())
  member_id     Int    @unique
  status        String
  Member        Member @relation(fields: [member_id], references: [mem_id])
}

model Member {
  mem_id    Int     @id @default(autoincrement())
  mem_name  String
  mem_phone String?
  mem_email String?

  Membership Membership?
  Issuances  Issuance[]
}

model Issuance {
  issuance_id       Int      @id @default(autoincrement())
  book_id           Int
  issuance_date     DateTime
  issuance_member   Int
  issued_by         String?
  target_return_date DateTime?
  issuance_status   String?

  Book   Book   @relation(fields: [book_id], references: [book_id])
  Member Member @relation(fields: [issuance_member], references: [mem_id])
}

model Book {
  book_id            Int       @id @default(autoincrement())
  book_name          String
  book_cat_id        Int?
  book_collection_id Int?
  book_launch_date   DateTime?
  book_publisher     String?

  Issuances  Issuance[]
  Category   Category?   @relation(fields: [book_cat_id], references: [cat_id])
  Collection Collection? @relation(fields: [book_collection_id], references: [collection_id])
}

model Collection {
  collection_id   Int    @id @default(autoincrement())
  collection_name String
  Books           Book[]
}

model Category {
  cat_id       Int    @id @default(autoincrement())
  cat_name     String
  sub_cat_name String?

  Books Book[]
}
```

## Usage

### Starting the Backend
```bash
npm run dev
```
The server will start on http://localhost:3001

### Starting the Frontend
```bash
cd frontend
npm start
```
The application will be available at http://localhost:3000

## API Endpoints

### Get All Books
- **URL:** `/api/books`
- **Method:** `GET`
- **Success Response:**
```json
[
  {
    "book_id": 1,
    "book_name": "Book Title",
    "book_publisher": "Publisher Name",
    "book_launch_date": "2023-01-01"
  }
]
```

### Borrow a Book
- **URL:** `/api/borrow`
- **Method:** `POST`
- **Body:**
```json
{
  "member_id": 1,
  "book_id": 1
}
```
- **Success Response:**
```json
{
  "message": "Book borrowed successfully"
}
```

## Error Handling
The application includes error handling for:
- Invalid API requests
- Database connection errors
- Data validation errors

