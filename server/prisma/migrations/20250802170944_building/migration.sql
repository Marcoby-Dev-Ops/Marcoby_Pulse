/*
  Warnings:

  - You are about to drop the column `group` on the `product_features` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `product_features` table. All the data in the column will be lost.
  - You are about to drop the column `productFeaturesId` on the `products` table. All the data in the column will be lost.
  - Added the required column `featureTypeId` to the `product_features` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `product_features` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'GBP', 'AUD', 'CAD');

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_productFeaturesId_fkey";

-- AlterTable
ALTER TABLE "product_features" DROP COLUMN "group",
DROP COLUMN "label",
ADD COLUMN     "featureTypeId" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "productFeaturesId";

-- CreateTable
CREATE TABLE "product_feature_type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "product_feature_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_features" ADD CONSTRAINT "product_features_featureTypeId_fkey" FOREIGN KEY ("featureTypeId") REFERENCES "product_feature_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_features" ADD CONSTRAINT "product_features_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
