/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `admin_id` column on the `Admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `book_id` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `book_cat_id` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `book_collection_id` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `cat_id` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Collection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `collection_id` column on the `Collection` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Issuance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `issuance_id` column on the `Issuance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `issued_by` column on the `Issuance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `mem_id` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Membership` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `membership_id` column on the `Membership` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[admin_email]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `book_id` on the `Issuance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `issuance_member` on the `Issuance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `member_id` on the `Membership` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_book_cat_id_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_book_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "Issuance" DROP CONSTRAINT "Issuance_book_id_fkey";

-- DropForeignKey
ALTER TABLE "Issuance" DROP CONSTRAINT "Issuance_issuance_member_fkey";

-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_member_id_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
DROP COLUMN "admin_id",
ADD COLUMN     "admin_id" SERIAL NOT NULL,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("admin_id");

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
DROP COLUMN "book_id",
ADD COLUMN     "book_id" SERIAL NOT NULL,
DROP COLUMN "book_cat_id",
ADD COLUMN     "book_cat_id" INTEGER,
DROP COLUMN "book_collection_id",
ADD COLUMN     "book_collection_id" INTEGER,
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("book_id");

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "cat_id",
ADD COLUMN     "cat_id" SERIAL NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("cat_id");

-- AlterTable
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_pkey",
DROP COLUMN "collection_id",
ADD COLUMN     "collection_id" SERIAL NOT NULL,
ADD CONSTRAINT "Collection_pkey" PRIMARY KEY ("collection_id");

-- AlterTable
ALTER TABLE "Issuance" DROP CONSTRAINT "Issuance_pkey",
DROP COLUMN "issuance_id",
ADD COLUMN     "issuance_id" SERIAL NOT NULL,
DROP COLUMN "book_id",
ADD COLUMN     "book_id" INTEGER NOT NULL,
DROP COLUMN "issuance_member",
ADD COLUMN     "issuance_member" INTEGER NOT NULL,
DROP COLUMN "issued_by",
ADD COLUMN     "issued_by" INTEGER,
ADD CONSTRAINT "Issuance_pkey" PRIMARY KEY ("issuance_id");

-- AlterTable
ALTER TABLE "Member" DROP CONSTRAINT "Member_pkey",
DROP COLUMN "mem_id",
ADD COLUMN     "mem_id" SERIAL NOT NULL,
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("mem_id");

-- AlterTable
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_pkey",
DROP COLUMN "membership_id",
ADD COLUMN     "membership_id" SERIAL NOT NULL,
DROP COLUMN "member_id",
ADD COLUMN     "member_id" INTEGER NOT NULL,
ADD CONSTRAINT "Membership_pkey" PRIMARY KEY ("membership_id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_admin_email_key" ON "Admin"("admin_email");

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member"("mem_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issuance" ADD CONSTRAINT "Issuance_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issuance" ADD CONSTRAINT "Issuance_issuance_member_fkey" FOREIGN KEY ("issuance_member") REFERENCES "Member"("mem_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_book_cat_id_fkey" FOREIGN KEY ("book_cat_id") REFERENCES "Category"("cat_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_book_collection_id_fkey" FOREIGN KEY ("book_collection_id") REFERENCES "Collection"("collection_id") ON DELETE SET NULL ON UPDATE CASCADE;
