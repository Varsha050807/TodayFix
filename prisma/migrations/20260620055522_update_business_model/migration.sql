/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categorySlug` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "aboutText" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "categorySlug" TEXT NOT NULL,
ADD COLUMN     "citySlug" TEXT,
ADD COLUMN     "experience" TEXT,
ADD COLUMN     "reviewsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "whatsapp" TEXT,
ADD COLUMN     "workingHours" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Business_slug_key" ON "Business"("slug");
