-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "features" TEXT[] DEFAULT ARRAY[]::TEXT[];
