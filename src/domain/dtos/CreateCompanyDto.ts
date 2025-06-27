import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CompanyType } from '../entities/CompanyType';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'The name of the company',
    example: 'Soluciones Innovadoras S.A.',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The type of company',
    enum: CompanyType,
    example: CompanyType.EMPRESA_PYME,
  })
  @IsEnum(CompanyType)
  type: CompanyType;
}