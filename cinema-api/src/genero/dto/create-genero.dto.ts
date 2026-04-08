import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGeneroDto {
  @ApiProperty({ example: 'Ação', description: 'Nome do gênero cinematográfico' })
  @IsString()
  @IsNotEmpty()
  nome: string;
}