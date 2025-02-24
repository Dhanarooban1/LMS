/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Collection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Issuance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Membership` table will be changed. If it partially fails, the table could be left without primary key constraint.

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

-- DropIndex
DROP INDEX "Admin_admin_email_key";

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
ALTER COLUMN "admin_id" DROP DEFAULT,
ALTER COLUMN "admin_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("admin_id");
DROP SEQUENCE "Admin_admin_id_seq";

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
ALTER COLUMN "book_id" DROP DEFAULT,
ALTER COLUMN "book_id" SET DATA TYPE TEXT,
ALTER COLUMN "book_cat_id" DROP NOT NULL,
ALTER COLUMN "book_cat_id" SET DATA TYPE TEXT,
ALTER COLUMN "book_collection_id" DROP NOT NULL,
ALTER COLUMN "book_collection_id" SET DATA TYPE TEXT,
ALTER COLUMN "book_launch_date" DROP NOT NULL,
ALTER COLUMN "book_publisher" DROP NOT NULL,
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("book_id");
DROP SEQUENCE "Book_book_id_seq";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
ALTER COLUMN "cat_id" DROP DEFAULT,
ALTER COLUMN "cat_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("cat_id");
DROP SEQUENCE "Category_cat_id_seq";

-- AlterTable
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_pkey",
ALTER COLUMN "collection_id" DROP DEFAULT,
ALTER COLUMN "collection_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Collection_pkey" PRIMARY KEY ("collection_id");
DROP SEQUENCE "Collection_collection_id_seq";

-- AlterTable
ALTER TABLE "Issuance" DROP CONSTRAINT "Issuance_pkey",
ALTER COLUMN "issuance_id" DROP DEFAULT,
ALTER COLUMN "issuance_id" SET DATA TYPE TEXT,
ALTER COLUMN "book_id" SET DATA TYPE TEXT,
ALTER COLUMN "issuance_member" SET DATA TYPE TEXT,
ALTER COLUMN "issued_by" DROP NOT NULL,
ALTER COLUMN "target_return_date" DROP NOT NULL,
ALTER COLUMN "issuance_status" DROP NOT NULL,
ADD CONSTRAINT "Issuance_pkey" PRIMARY KEY ("issuance_id");
DROP SEQUENCE "Issuance_issuance_id_seq";

-- AlterTable
ALTER TABLE "Member" DROP CONSTRAINT "Member_pkey",
ALTER COLUMN "mem_id" DROP DEFAULT,
ALTER COLUMN "mem_id" SET DATA TYPE TEXT,
ALTER COLUMN "mem_phone" DROP NOT NULL,
ALTER COLUMN "mem_email" DROP NOT NULL,
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("mem_id");
DROP SEQUENCE "Member_mem_id_seq";

-- AlterTable
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_pkey",
ALTER COLUMN "membership_id" DROP DEFAULT,
ALTER COLUMN "membership_id" SET DATA TYPE TEXT,
ALTER COLUMN "member_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Membership_pkey" PRIMARY KEY ("membership_id");
DROP SEQUENCE "Membership_membership_id_seq";

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
