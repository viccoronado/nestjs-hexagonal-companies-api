import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ICompanyRepository } from '../../domain/repositories/ICompanyRepository';
import { Company } from '../../domain/entities/Company';
import { CompanyType } from 'src/domain/entities/CompanyType';
import { CreateCompanyDto } from 'src/domain/dtos/CreateCompanyDto';

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository) {}

  async execute(createCompanyDto: CreateCompanyDto): Promise<Company> {
    this.validateCompanyData(createCompanyDto);

    const company = Company.create(
      createCompanyDto.name,
      createCompanyDto.type
    );

    await this.companyRepository.save(company);
    return company;
  }

  private validateCompanyData(dto: CreateCompanyDto): void {
    if (!dto.name || dto.name.trim().length === 0) {
      throw new BadRequestException('Company name is required');
    }
    const validTypes = Object.values(CompanyType);
    if (!validTypes.includes(dto.type)) {
      throw new BadRequestException(
        `Invalid company type. Allowed: ${validTypes.join(', ')}`
      );
    }
  }
}