import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateFilmeDto {
  @ApiProperty({ example: 'Batman' })
  @IsString() @IsNotEmpty()
  titulo: string;

  @ApiProperty({ example: 120, description: 'Duração em minutos' })
  @IsInt() @Min(1)
  duracao: number;

  @ApiProperty({ example: '14 anos' })
  @IsString() @IsNotEmpty()
  classificacaoEtaria: string;

  @ApiProperty({ example: 1, description: 'ID do Gênero' })
  @IsInt()
  generoId: number;
}