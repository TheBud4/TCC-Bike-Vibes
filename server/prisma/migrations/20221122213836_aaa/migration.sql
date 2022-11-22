/*
  Warnings:

  - A unique constraint covering the columns `[idUsuario]` on the table `aluguel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "aluguel_idUsuario_key" ON "aluguel"("idUsuario");
