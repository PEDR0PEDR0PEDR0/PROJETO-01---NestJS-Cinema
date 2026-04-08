import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GeneroService {
  constructor(private prisma: PrismaService) {}

  async create(createGeneroDto: CreateGeneroDto) {
    try {
      return await this.prisma.genero.create({ data: createGeneroDto });
    } catch (error) {
      throw new ConflictException('Este gênero já existe.');
    }
  }

  findAll() {
    return this.prisma.genero.findMany();
  }

  async findOne(id: number) {
    const genero = await this.prisma.genero.findUnique({ where: { id } });
    if (!genero) throw new NotFoundException(`Gênero #${id} não encontrado`);
    return genero;
  }

  update(id: number, updateGeneroDto: UpdateGeneroDto) {
    return this.prisma.genero.update({
      where: { id },
      data: updateGeneroDto,
    });
  }

  remove(id: number) {
    return this.prisma.genero.delete({ where: { id } });
  }
}