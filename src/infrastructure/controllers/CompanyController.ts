import { Controller, Post, Body, Get } from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth 
} from '@nestjs/swagger';
import { CreateCompanyUseCase } from '../../application/use-cases/CreateCompanyUseCase';
import { GetCompaniesWithTransfersUseCase } from '../../application/use-cases/GetCompaniesWithTransfersUseCase';
import { GetCompaniesJoinedLastMonthUseCase } from '../../application/use-cases/GetCompaniesJoinedLastMonthUseCase';
import { CreateCompanyDto } from '../../domain/dtos/CreateCompanyDto';

@ApiTags('Companies')
@ApiBearerAuth()
@Controller('companies')
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly getCompaniesWithTransfersUseCase: GetCompaniesWithTransfersUseCase,
    private readonly getCompaniesJoinedLastMonthUseCase: GetCompaniesJoinedLastMonthUseCase,
  ) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new company',
    description: 'Creates a new company (PYME or CORPORATIVA)'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Company created successfully',
    type: CreateCompanyDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid input data'
  })
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.createCompanyUseCase.execute(createCompanyDto);
  }

  @Get('with-transfers')
  @ApiOperation({
    summary: 'Get companies with transfers',
    description: 'Returns all companies that made transfers in the last month'
  })
  @ApiResponse({
    status: 200,
    description: 'List of companies with transfers',
    type: [CreateCompanyDto]
  })
  async getCompaniesWithTransfers() {
    // MOCK DATA
    return [
      {
        id: "1a2b3c4d-0001-0000-0000-000000000001",
        name: "Transacciones Pyme S.A.",
        type: "EMPRESA_PYME",
        joinedAt: "2024-01-15T10:00:00.000Z"
      },
      {
        id: "1a2b3c4d-0002-0000-0000-000000000002",
        name: "Corporativo Global S.A.",
        type: "EMPRESA_CORPORATIVA",
        joinedAt: "2023-11-20T09:30:00.000Z"
      }
    ];
    // Para usar el caso de uso real, comenta lo anterior y descomenta lo siguiente:
    // return this.getCompaniesWithTransfersUseCase.execute();
  }

  @Get('joined-last-month')
  @ApiOperation({
    summary: 'Get companies joined last month',
    description: 'Returns all companies that joined in the last month'
  })
  @ApiResponse({
    status: 200,
    description: 'List of companies joined last month',
    type: [CreateCompanyDto]
  })
  async getCompaniesJoinedLastMonth() {
    // MOCK DATA
    return [
      {
        id: "1a2b3c4d-0003-0000-0000-000000000003",
        name: "Nuevas Soluciones Pyme",
        type: "EMPRESA_PYME",
        joinedAt: "2025-06-01T12:00:00.000Z"
      },
      {
        id: "1a2b3c4d-0004-0000-0000-000000000004",
        name: "Innovación Corporativa S.A.",
        type: "EMPRESA_CORPORATIVA",
        joinedAt: "2025-06-10T15:45:00.000Z"
      }
    ];
    // Para usar el caso de uso real, comenta lo anterior y descomenta lo siguiente:
    // return this.getCompaniesJoinedLastMonthUseCase.execute();
  }
}