/*
  Warnings:

  - You are about to drop the column `description` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `lastTaskOrder` on the `List` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "List" DROP COLUMN "description",
DROP COLUMN "dueDate",
DROP COLUMN "lastTaskOrder";
