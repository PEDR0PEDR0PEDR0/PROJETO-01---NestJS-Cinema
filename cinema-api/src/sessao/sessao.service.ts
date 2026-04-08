import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';
import { UpdateSessaoDto } from './dto/update-sessao.dto';

@Injectable()
export class SessaoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSessaoDto) {
    // A conversão de string para Date geralmente acontece no DTO (com @Type(() => Date))
    // Mas garantimos aqui que o Prisma receba o formato correto
    try {
      return await this.prisma.sessao.create({
        data: {
          ...dto,
          // Se o DTO não converter automaticamente, fazemos aqui:
          data: new Date(dto.data), 
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao criar sessão. Verifique os dados e o formato da data.');
    }
  }

  findAll() {
    return this.prisma.sessao.findMany({ 
      include: { 
        filme: true, 
        sala: true 
      } 
    });
  }

  async findOne(id: number) {
    const sessao = await this.prisma.sessao.findUnique({ 
      where: { id }, 
      include: { filme: true, sala: true } 
    });
    
    if (!sessao) throw new NotFoundException('Sessão não encontrada');
    return sessao;
  }

  async update(id: number, dto: UpdateSessaoDto) {
    return this.prisma.sessao.update({
      where: { id },
      data: {
        ...dto,
        data: dto.data ? new Date(dto.data) : undefined,
      },
    });
  }

  remove(id: number) {
    return this.prisma.sessao.delete({ where: { id } });
  }
}