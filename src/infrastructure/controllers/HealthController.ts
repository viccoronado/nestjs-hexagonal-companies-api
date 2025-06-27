import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

class HealthCheckResponse {
  status: string;
  timestamp: string;
}

@ApiTags('Health Check')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ 
    summary: 'Check API health status',
    description: 'Returns the current health status of the API and timestamp'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'API is healthy',
    type: HealthCheckResponse
  })
  @ApiResponse({ 
    status: 503, 
    description: 'API is not available'
  })
  check(): HealthCheckResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}