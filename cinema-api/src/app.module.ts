import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GeneroModule } from './genero/genero.module';
import { FilmeModule } from './filme/filme.module';
import { SalaModule } from './sala/sala.module';
import { SessaoModule } from './sessao/sessao.module';
import { LancheComboModule } from './lanche-combo/lanche-combo.module';
import { PedidoModule } from './pedido/pedido.module';
import { IngressoModule } from './ingresso/ingresso.module';

@Module({
  imports: [PrismaModule, GeneroModule, FilmeModule, SalaModule, SessaoModule, LancheComboModule, PedidoModule, IngressoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}