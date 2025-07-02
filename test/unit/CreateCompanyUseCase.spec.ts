import { Test, TestingModule } from '@nestjs/testing';
import { CreateCompanyUseCase } from '../../src/application/use-cases/CreateCompanyUseCase';
import { ICompanyRepository } from '../../src/domain/repositories/ICompanyRepository';
import { BadRequestException } from '@nestjs/common';
import { Company } from '../../src/domain/entities/Company';
import { CompanyType } from '../../src/domain/entities/CompanyType';
import { CreateCompanyDto } from '../../src/domain/dtos/CreateCompanyDto';

describe('CreateCompanyUseCase', () => {
  let useCase: CreateCompanyUseCase;
  let mockRepository: jest.Mocked<ICompanyRepository>;

  beforeEach(async () => {
    mockRepository = {
      save: jest.fn(),
      findCompaniesWithTransfersLastMonth: jest.fn(),
      findCompaniesJoinedLastMonth: jest.fn(),
      saveTransfer: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCompanyUseCase,
        { provide: 'ICompanyRepository', useValue: mockRepository },
      ],
    }).compile();

    useCase = module.get<CreateCompanyUseCase>(CreateCompanyUseCase);
  });

  it('should create a company successfully', async () => {
    const dto: CreateCompanyDto = {
      name: 'Empresa Test',
      type: CompanyType.EMPRESA_PYME,
    };

    const fakeCompany = {
      id: 'uuid',
      name: dto.name,
      type: dto.type,
      joinedAt: new Date(),
    } as Company;

    jest.spyOn(Company, 'create').mockReturnValue(fakeCompany);

    const result = await useCase.execute(dto);

    expect(result).toBe(fakeCompany);
    expect(mockRepository.save).toHaveBeenCalledWith(fakeCompany);
  });

  it('should throw BadRequestException if name is empty', async () => {
    const dto: CreateCompanyDto = {
      name: '',
      type: CompanyType.EMPRESA_PYME,
    };

    await expect(useCase.execute(dto)).rejects.toThrow(BadRequestException);
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('should throw BadRequestException if type is invalid', async () => {
    const dto: any = {
      name: 'Empresa Test',
      type: 'INVALID_TYPE',
    };

    await expect(useCase.execute(dto)).rejects.toThrow(BadRequestException);
    expect(mockRepository.save).not.toHaveBeenCalled();
  });
});