/*
  Warnings:

  - Made the column `book_cat_id` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `book_collection_id` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `book_launch_date` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `book_publisher` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `issued_by` on table `Issuance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `target_return_date` on table `Issuance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `issuance_status` on table `Issuance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mem_phone` on table `Member` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mem_email` on table `Member` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_book_cat_id_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_book_collection_id_fkey";

-- DropIndex
DROP INDEX "Membership_member_id_key";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "book_cat_id" SET NOT NULL,
ALTER COLUMN "book_collection_id" SET NOT NULL,
ALTER COLUMN "book_launch_date" SET NOT NULL,
ALTER COLUMN "book_publisher" SET NOT NULL;

-- AlterTable
ALTER TABLE "Issuance" ALTER COLUMN "issued_by" SET NOT NULL,
ALTER COLUMN "target_return_date" SET NOT NULL,
ALTER COLUMN "issuance_status" SET NOT NULL;

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "mem_phone" SET NOT NULL,
ALTER COLUMN "mem_email" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_book_collection_id_fkey" FOREIGN KEY ("book_collection_id") REFERENCES "Collection"("collection_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_book_cat_id_fkey" FOREIGN KEY ("book_cat_id") REFERENCES "Category"("cat_id") ON DELETE RESTRICT ON UPDATE CASCADE;
