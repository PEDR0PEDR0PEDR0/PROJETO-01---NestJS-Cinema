import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateSalaDto {
  @ApiProperty({ example: 'Sala 01 Premium' })
  @IsString() @IsNotEmpty()
  identificacao: string;

  @ApiProperty({ example: 50 })
  @IsInt() @Min(1)
  capacidade: number;
}