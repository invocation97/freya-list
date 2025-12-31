/*
  Warnings:

  - A unique constraint covering the columns `[tokenHash]` on the table `ListInvite` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ItemEvent" DROP CONSTRAINT "ItemEvent_actorUserId_fkey";

-- DropForeignKey
ALTER TABLE "ItemEvent" DROP CONSTRAINT "ItemEvent_itemId_fkey";

-- DropForeignKey
ALTER TABLE "ItemEvent" DROP CONSTRAINT "ItemEvent_listId_fkey";

-- DropForeignKey
ALTER TABLE "ListInvite" DROP CONSTRAINT "ListInvite_listId_fkey";

-- DropForeignKey
ALTER TABLE "ListItem" DROP CONSTRAINT "ListItem_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "ListItem" DROP CONSTRAINT "ListItem_listId_fkey";

-- AlterTable
ALTER TABLE "ItemEvent" ALTER COLUMN "itemId" DROP NOT NULL,
ALTER COLUMN "payload" DROP NOT NULL,
ALTER COLUMN "actorUserId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ListItem" ALTER COLUMN "unit" DROP NOT NULL,
ALTER COLUMN "createdByUserId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ListMember" ALTER COLUMN "role" SET DEFAULT 'VIEWER';

-- CreateIndex
CREATE INDEX "ListInvite_listId_idx" ON "ListInvite"("listId");

-- CreateIndex
CREATE INDEX "ListInvite_expiresAt_idx" ON "ListInvite"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "ListInvite_tokenHash_key" ON "ListInvite"("tokenHash");

-- AddForeignKey
ALTER TABLE "ListInvite" ADD CONSTRAINT "ListInvite_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemEvent" ADD CONSTRAINT "ItemEvent_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemEvent" ADD CONSTRAINT "ItemEvent_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "ListItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemEvent" ADD CONSTRAINT "ItemEvent_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
