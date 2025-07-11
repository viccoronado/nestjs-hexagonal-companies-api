import { Module } from '@nestjs/common';
import { CompanyController } from './infrastructure/controllers/CompanyController';
import { CreateCompanyUseCase } from './application/use-cases/CreateCompanyUseCase';
import { GetCompaniesWithTransfersUseCase } from './application/use-cases/GetCompaniesWithTransfersUseCase';
import { GetCompaniesJoinedLastMonthUseCase } from './application/use-cases/GetCompaniesJoinedLastMonthUseCase';
import { InMemoryCompanyRepository } from './infrastructure/persistence/in-memory/InMemoryCompanyRepository';
import { HealthController } from './infrastructure/controllers/HealthController';

@Module({
  controllers: [CompanyController,
    HealthController
  ],
  providers: [
    CreateCompanyUseCase,
    GetCompaniesWithTransfersUseCase,
    GetCompaniesJoinedLastMonthUseCase,
    {
      provide: 'ICompanyRepository',
      useClass: InMemoryCompanyRepository,
    },
  ],
})
export class AppModule {}