/*
  Warnings:

  - Added the required column `date` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Comment" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;
