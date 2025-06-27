import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CompanyType } from 'src/domain/entities/CompanyType';

interface RegisterCompanyRequest {
  name: string;
  type: CompanyType;
}

interface RegisterCompanyResponse {
  id: string;
  name: string;
  type: CompanyType;
  joinedAt: string;
}

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing request body' }),
      };
    }

  const request: RegisterCompanyRequest = JSON.parse(event.body || '{}');

    if (!request.name || !request.type) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Name and type are required' }),
      };
    }

    if (!Object.values(CompanyType).includes(request.type)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid company type' }),
      };
    }

    const company: RegisterCompanyResponse = {
      id: crypto.randomUUID(),
      name: request.name,
      type: request.type,
      joinedAt: new Date().toISOString(),
    };

    return {
      statusCode: 201,
      body: JSON.stringify(company),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};