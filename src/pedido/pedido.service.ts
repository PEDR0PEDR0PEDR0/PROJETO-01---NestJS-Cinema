import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePedidoDto) {
    const { ingressosIds = [], lanchesIds = [] } = data;
    const ingressos = await this.prisma.ingresso.findMany({ where: { id: { in: ingressosIds } } });
    const lanches = await this.prisma.lancheCombo.findMany({ where: { id: { in: lanchesIds } } });

    const valorTotal = ingressos.reduce((acc, i) => acc + i.valorPago, 0) + 
                       lanches.reduce((acc, l) => acc + l.preco, 0);

    if (valorTotal === 0) throw new BadRequestException('Pedido vazio');

    return this.prisma.pedido.create({
      data: {
        valorTotal,
        ingressos: { connect: ingressosIds.map(id => ({ id })) },
        lanches: { connect: lanchesIds.map(id => ({ id })) }
      },
      include: { ingressos: true, lanches: true }
    });
  }

  findAll() {
    return this.prisma.pedido.findMany({ include: { ingressos: true, lanches: true } });
  }

  async findOne(id: number) {
    const pedido = await this.prisma.pedido.findUnique({ where: { id }, include: { ingressos: true, lanches: true } });
    if (!pedido) throw new NotFoundException('Pedido não encontrado');
    return pedido;
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return this.prisma.pedido.update({ where: { id }, data: {} }); // Pedidos geralmente não se editam itens, mas o método precisa existir
  }

  remove(id: number) {
    return this.prisma.pedido.delete({ where: { id } });
  }
}