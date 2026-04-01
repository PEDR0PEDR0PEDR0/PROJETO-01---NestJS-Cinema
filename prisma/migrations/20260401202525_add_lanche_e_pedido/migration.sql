-- CreateTable
CREATE TABLE "LancheCombo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LancheCombo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingresso" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "valorPago" DOUBLE PRECISION NOT NULL,
    "sessaoId" INTEGER NOT NULL,
    "pedidoId" INTEGER,

    CONSTRAINT "Ingresso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valorTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PedidoLanches" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PedidoLanches_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PedidoLanches_B_index" ON "_PedidoLanches"("B");

-- AddForeignKey
ALTER TABLE "Ingresso" ADD CONSTRAINT "Ingresso_sessaoId_fkey" FOREIGN KEY ("sessaoId") REFERENCES "Sessao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingresso" ADD CONSTRAINT "Ingresso_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PedidoLanches" ADD CONSTRAINT "_PedidoLanches_A_fkey" FOREIGN KEY ("A") REFERENCES "LancheCombo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PedidoLanches" ADD CONSTRAINT "_PedidoLanches_B_fkey" FOREIGN KEY ("B") REFERENCES "Pedido"("id") ON DELETE CASCADE ON UPDATE CASCADE;
