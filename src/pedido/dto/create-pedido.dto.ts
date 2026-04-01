import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional } from 'class-validator';

export class CreatePedidoDto {
  @ApiProperty({ example: [1, 2], description: 'IDs dos ingressos' })
  @IsArray() @IsInt({ each: true }) @IsOptional()
  ingressosIds: number[];

  @ApiProperty({ example: [1], description: 'IDs dos lanches' })
  @IsArray() @IsInt({ each: true }) @IsOptional()
  lanchesIds: number[];
}