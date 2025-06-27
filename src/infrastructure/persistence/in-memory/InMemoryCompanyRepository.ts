import { Injectable } from '@nestjs/common';
import { Company } from '../../../domain/entities/Company';
import { Transfer } from '../../../domain/entities/Transfer';
import { ICompanyRepository } from '../../../domain/repositories/ICompanyRepository';

@Injectable()
export class InMemoryCompanyRepository implements ICompanyRepository {
  private companies: Company[] = [];
  private transfers: Transfer[] = [];

  async save(company: Company): Promise<void> {
    this.companies.push(company);
  }

  async findCompaniesWithTransfersLastMonth(): Promise<Company[]> {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const companyIdsWithTransfers = this.transfers
      .filter(t => t.date >= lastMonth)
      .map(t => t.companyId);

    return this.companies.filter(c => 
      companyIdsWithTransfers.includes(c.id)
    );
  }

  async findCompaniesJoinedLastMonth(): Promise<Company[]> {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    return this.companies.filter(c => c.joinedAt >= lastMonth);
  }

  async saveTransfer(transfer: Transfer): Promise<void> {
    this.transfers.push(transfer);
  }
}