import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';

@Injectable()
export class IngressoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateIngressoDto) {
    // 1. Busca a sessão e inclui a capacidade da sala
    const sessao = await this.prisma.sessao.findUnique({
      where: { id: data.sessaoId },
      include: { sala: true },
    });

    if (!sessao) throw new NotFoundException('Sessão não encontrada');

    // 2. Conta quantos ingressos já foram vendidos para esta sessão
    const ingressosVendidos = await this.prisma.ingresso.count({
      where: { sessaoId: data.sessaoId },
    });

    // REGRA DE NEGÓCIO 2: Verificar capacidade
    if (ingressosVendidos >= sessao.sala.capacidade) {
      throw new BadRequestException(
        `Esgotado! A sala ${sessao.sala.identificacao} atingiu a capacidade máxima de ${sessao.sala.capacidade} lugares.`,
      );
    }

    return this.prisma.ingresso.create({ data });
  }

  findAll() {
    return this.prisma.ingresso.findMany({
      include: { sessao: { include: { filme: true, sala: true } } },
    });
  }

  async findOne(id: number) {
    const ingresso = await this.prisma.ingresso.findUnique({
      where: { id },
      include: { sessao: true },
    });
    if (!ingresso) throw new NotFoundException('Ingresso não encontrado');
    return ingresso;
  }

  update(id: number, data: UpdateIngressoDto) {
    return this.prisma.ingresso.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.ingresso.delete({ where: { id } });
  }
}