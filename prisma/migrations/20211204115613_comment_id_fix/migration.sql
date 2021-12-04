/*
  Warnings:

  - You are about to drop the column `coomentId` on the `CommentLike` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[commentId,userId]` on the table `CommentLike` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `commentId` to the `CommentLike` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_coomentId_fkey";

-- DropIndex
DROP INDEX "CommentLike_coomentId_userId_key";

-- AlterTable
ALTER TABLE "CommentLike" DROP COLUMN "coomentId",
ADD COLUMN     "commentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CommentLike_commentId_userId_key" ON "CommentLike"("commentId", "userId");

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
