-- CreateTable
CREATE TABLE "Content" (
    "contentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "archived" BOOLEAN,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("contentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Content_contentId_key" ON "Content"("contentId");

