import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CompanyType } from '../../src/domain/entities/CompanyType';

describe('CompanyController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/POST companies', () => {
    return request(app.getHttpServer())
      .post('/companies')
      .send({
        name: 'Test Company',
        type: CompanyType.EMPRESA_PYME,
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});