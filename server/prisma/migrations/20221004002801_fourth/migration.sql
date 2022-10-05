-- CreateTable
CREATE TABLE "usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "Padm" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "aluguel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idUsuario" INTEGER NOT NULL,
    CONSTRAINT "aluguel_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "prodIMG" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "nota" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emissao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vencimento" DATETIME NOT NULL,
    "devolucao" DATETIME NOT NULL,
    "IDUsuario" INTEGER NOT NULL,
    "IDAluguel" INTEGER NOT NULL,
    "IDProduto" INTEGER NOT NULL,
    CONSTRAINT "nota_IDProduto_fkey" FOREIGN KEY ("IDProduto") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "nota_IDAluguel_fkey" FOREIGN KEY ("IDAluguel") REFERENCES "aluguel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "nota_IDUsuario_fkey" FOREIGN KEY ("IDUsuario") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_CPF_key" ON "usuario"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "aluguel_idUsuario_key" ON "aluguel"("idUsuario");
