import { Company } from '../entities/Company';
import { CompanyType } from '../entities/CompanyType';

export interface CompanyRegistrationPort {
  registerCompany(name: string, type: CompanyType): Promise<Company>;
}