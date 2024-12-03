import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from '../../src/externals/datasource/typeorm/typeormconfig.module';
import ProductRepository from '../../src/externals/datasource/typeorm/repositories/product.repository';
import ProductsMock from '../../src/externals/datasource/typeorm/seed/seed-tables/product.seed';

const feature = loadFeature('./tests/features/product.feature');
jest.setTimeout(30000);

const mockProductRepository = {
  findAll: jest.fn().mockResolvedValue(ProductsMock),
  findOneById: jest.fn().mockResolvedValue(ProductsMock[0]),
  findByCategory: jest.fn().mockResolvedValue([]),
  insert: jest.fn().mockResolvedValue(ProductsMock[0]),
  update: jest.fn().mockResolvedValue(1),
  delete: jest.fn().mockResolvedValue(1),
};

const initializeTestApp = async (): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [TestModule],
  })
    .overrideProvider(ProductRepository)
    .useValue(mockProductRepository)
    .compile();

  const app = moduleFixture.createNestApplication();
  await app.init();
  return app;
};

defineFeature(feature, (test) => {
  let app: INestApplication;
  let responseWithToken: request.Response;
  let responseWithoutToken: request.Response;

  beforeAll(async () => {
    app = await initializeTestApp();
  }, 30000);

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  test('Admin accesses products endpoint', ({ given, when, then, and }) => {
    given('I am an authorized admin', () => {
    });

    when('I request the "GET /products" endpoint', async () => {
      responseWithToken = await request(app.getHttpServer())
        .get('/products')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhNDE4MjQ1OC04MDQxLTcwMjEtZTIyNi0wYTJiMGYwN2E5ZDYiLCJjcGYiOiJ0ZWNoLWNoYWxsZW5nZS1vcmRlciIsImlzQWRtaW4iOnRydWUsImlhdCI6MTczMjg0MDE0NCwiZXhwIjoxNzMyODQzNzQ0fQ.h8AO2ut9tTPwHvnB97yLYGPmSQpZaj4i_iOBZUxmibM');
    });

    then('the response status code should be 200', () => {
      expect(responseWithToken.status).toBe(200);
    });

    and('the response should contain a list of products', () => {
      expect(responseWithToken.body).toEqual(ProductsMock);
    });
  });

  test('Accessing products endpoint without token', ({ given, when, then, and }) => {
    given('I do not provide a token', () => {
    });

    when('I request the "GET /products" endpoint', async () => {
      responseWithoutToken = await request(app.getHttpServer()).get('/products');
    });

    then('the response status code should be 401', () => {
      expect(responseWithoutToken.status).toBe(401);
    });

    and('the response should contain "Authorization header not found"', () => {
      expect(responseWithoutToken.body.message).toBe('Authorization header not found');
    });
  });
});
