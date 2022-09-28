/*
  Warnings:

  - You are about to drop the column `RG` on the `usuario` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);
INSERT INTO "new_usuario" ("CPF", "email", "id", "nome", "senha") SELECT "CPF", "email", "id", "nome", "senha" FROM "usuario";
DROP TABLE "usuario";
ALTER TABLE "new_usuario" RENAME TO "usuario";
CREATE UNIQUE INDEX "usuario_CPF_key" ON "usuario"("CPF");
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
