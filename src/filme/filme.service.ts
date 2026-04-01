import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';

@Injectable()
export class FilmeService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateFilmeDto) {
    return this.prisma.filme.create({ data });
  }

  findAll() {
    return this.prisma.filme.findMany({ include: { genero: true } });
  }

  async findOne(id: number) {
    const filme = await this.prisma.filme.findUnique({ where: { id }, include: { genero: true } });
    if (!filme) throw new NotFoundException('Filme não encontrado');
    return filme;
  }

  update(id: number, data: UpdateFilmeDto) {
    return this.prisma.filme.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.filme.delete({ where: { id } });
  }
}