import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLancheComboDto } from './dto/create-lanche-combo.dto';
import { UpdateLancheComboDto } from './dto/update-lanche-combo.dto';

@Injectable()
export class LancheComboService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateLancheComboDto) {
    return this.prisma.lancheCombo.create({ data });
  }

  findAll() {
    return this.prisma.lancheCombo.findMany();
  }

  findOne(id: number) {
    return this.prisma.lancheCombo.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateLancheComboDto) {
    return this.prisma.lancheCombo.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.lancheCombo.delete({ where: { id } });
  }
}