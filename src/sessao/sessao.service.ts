import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';
import { UpdateSessaoDto } from './dto/update-sessao.dto';

@Injectable()
export class SessaoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSessaoDto) {
    // ... (mantenha sua lógica de validação de horário aqui)
    return this.prisma.sessao.create({ data });
  }

  findAll() {
    return this.prisma.sessao.findMany({ include: { filme: true, sala: true } });
  }

  async findOne(id: number) {
    const sessao = await this.prisma.sessao.findUnique({ where: { id }, include: { filme: true, sala: true } });
    if (!sessao) throw new NotFoundException('Sessão não encontrada');
    return sessao;
  }

  update(id: number, data: UpdateSessaoDto) {
    return this.prisma.sessao.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.sessao.delete({ where: { id } });
  }
}