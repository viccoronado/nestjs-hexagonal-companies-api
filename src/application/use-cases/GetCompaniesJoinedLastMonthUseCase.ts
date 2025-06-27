import { Inject, Injectable } from '@nestjs/common';
import { ICompanyRepository } from '../../domain/repositories/ICompanyRepository';
import { Company } from '../../domain/entities/Company';

@Injectable()
export class GetCompaniesJoinedLastMonthUseCase {
  constructor(
     @Inject('ICompanyRepository')
     private readonly companyRepository: ICompanyRepository) {}

  async execute(): Promise<Company[]> {
    return this.companyRepository.findCompaniesJoinedLastMonth();
  }
}