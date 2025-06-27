import { Company } from '../entities/Company';
import { Transfer } from '../entities/Transfer';

export interface ICompanyRepository {
  save(company: Company): Promise<void>;
  findCompaniesWithTransfersLastMonth(): Promise<Company[]>;
  findCompaniesJoinedLastMonth(): Promise<Company[]>;
  saveTransfer(transfer: Transfer): Promise<void>;
}