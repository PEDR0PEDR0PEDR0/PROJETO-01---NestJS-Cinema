import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateIngressoDto {
  @ApiProperty({ example: 1, description: 'ID da Sessão' })
  @IsInt()
  sessaoId: number;

  @ApiProperty({ example: 'Inteira' })
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @ApiProperty({ example: 30.00 })
  @Min(0)
  valorPago: number;
}