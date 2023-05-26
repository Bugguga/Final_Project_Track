/*
  Warnings:

  - Added the required column `lastTaskOrder` to the `List` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `List` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "List" ADD COLUMN     "lastTaskOrder" INTEGER NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "order" INTEGER NOT NULL;
