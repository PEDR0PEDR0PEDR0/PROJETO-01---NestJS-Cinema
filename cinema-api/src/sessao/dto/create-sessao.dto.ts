import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsNumber, IsISO8601 } from 'class-validator';

export class CreateSessaoDto {
  @ApiProperty({ example: '2026-04-01T20:00:00Z' })
  @IsISO8601()
  data!: string; // Adicionado o '!'

  @ApiProperty({ example: 35.50 })
  @IsNumber()
  valorIngresso!: number; // Adicionado o '!'

  @ApiProperty({ example: 1 })
  @IsInt()
  filmeId!: number; // Adicionado o '!'

  @ApiProperty({ example: 1 })
  @IsInt()
  salaId!: number; // Adicionado o '!'
}