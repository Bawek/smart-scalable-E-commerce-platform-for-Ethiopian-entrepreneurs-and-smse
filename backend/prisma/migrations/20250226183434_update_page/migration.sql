/*
  Warnings:

  - You are about to drop the `Mypage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Mypage";

-- CreateTable
CREATE TABLE "MyPage" (
    "id" SERIAL NOT NULL,
    "templateId" SERIAL NOT NULL,
    "data" JSONB NOT NULL,
    "name" TEXT,

    CONSTRAINT "MyPage_pkey" PRIMARY KEY ("id")
);
