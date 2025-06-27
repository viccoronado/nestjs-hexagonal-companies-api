import { Injectable } from '@nestjs/common';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { Company } from 'src/domain/entities/Company';
import { CompanyType } from 'src/domain/entities/CompanyType';
import { CompanyRegistrationPort } from 'src/domain/ports/company-registration.port';

@Injectable()
export class AwsLambdaCompanyRegistrationAdapter implements CompanyRegistrationPort {
  private readonly lambda = new LambdaClient({ region: 'us-east-1' });

  async registerCompany(name: string, type: CompanyType): Promise<Company> {
    const params = {
      FunctionName: 'register-company-function',
      Payload: JSON.stringify({ name, type })
    };

    const command = new InvokeCommand(params);
    const response = await this.lambda.send(command);
    const payload = JSON.parse(new TextDecoder().decode(response.Payload));
    
    return new Company(
      payload.id,
      payload.name,
      payload.type,
      new Date(payload.joinedAt)
    );
  }
}