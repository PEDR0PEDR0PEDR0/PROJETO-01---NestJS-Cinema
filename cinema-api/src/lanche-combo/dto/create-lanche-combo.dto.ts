import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateLancheComboDto {
  @ApiProperty({ example: 'Combo Mega' })
  @IsString() @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'Pipoca G + Refri 1L' })
  @IsString() @IsNotEmpty()
  descricao: string;

  @ApiProperty({ example: 45.90 })
  @IsNumber() @Min(0)
  preco: number;
}