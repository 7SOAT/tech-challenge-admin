import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import ProductRoute from '../../src/api/routes/product/product.route';
import ProductRepository from '../../src/externals/datasource/typeorm/repositories/product.repository';
import ProductsMock from '../../src/externals/datasource/typeorm/seed/seed-tables/product.seed';
import { AdminGuard } from '../../src/api/validators/admin-guard';

const feature = loadFeature('./tests/features/product.feature');
jest.setTimeout(30000);

const mockProductRepository = {
  findOneById: jest.fn(),
  findAll: jest.fn(),
  findByCategory: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const initializeTestApp = async (): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    controllers: [ProductRoute],
    providers: [
      {
        provide: ProductRepository,
        useValue: mockProductRepository,
      },
      {
        provide: AdminGuard,
        useValue: { canActivate: jest.fn().mockReturnValue(true) },
      },
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();
  return app;
};

defineFeature(feature, (test) => {
  let app: INestApplication;
  let response: request.Response;

  beforeAll(async () => {
    app = await initializeTestApp();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  test('Admin accesses products endpoint', ({ given, when, then, and }) => {
    given('I am an authorized admin', () => {
      mockProductRepository.findAll.mockResolvedValue(ProductsMock);
    });

    when('I request the "GET /products" endpoint', async () => {
      response = await request(app.getHttpServer())
        .get('/products')
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhNDE4MjQ1OC04MDQxLTcwMjEtZTIyNi0wYTJiMGYwN2E5ZDYiLCJjcGYiOiJ0ZWNoLWNoYWxsZW5nZS1vcmRlciIsImlzQWRtaW4iOnRydWUsImlhdCI6MTczMjg0MDE0NCwiZXhwIjoxNzMyODQzNzQ0fQ.h8AO2ut9tTPwHvnB97yLYGPmSQpZaj4i_iOBZUxmibM',
        );
    });

    then('the response status code should be 200', () => {
      expect(response.status).toBe(200);
    });

    and('the response should contain a list of products', () => {
      expect(response.body).toEqual(ProductsMock);
    });
  });

  test('Accessing products endpoint without token', ({ given, when, then, and }) => {
    given('I do not provide a token', () => {
    });

    when('I request the "GET /products" endpoint', async () => {
      response = await request(app.getHttpServer()).get('/products');
    });

    then('the response status code should be 401', () => {
      expect(response.status).toBe(401);
    });

    and('the response should contain "Authorization header not found"', () => {
      expect(response.body.message).toBe('Authorization header not found');
    });
  });

  test('Accessing products endpoint with token but no admin permission', ({ given, when, then, and }) => {
    given('I am a user without admin permission', () => {
      mockProductRepository.findAll.mockResolvedValue(ProductsMock);
    });

    when('I request the "GET /products" endpoint', async () => {
      response = await request(app.getHttpServer())
        .get('/products')
        .set('Authorization', 'Bearer some_non_admin_token');
    });

    then('the response status code should be 401', () => {
      expect(response.status).toBe(401);
    });

    and('the response should contain "Unauthorized"', () => {
      expect(response.body.message).toBe('Unauthorized');
    });
  });

  test('Accessing products endpoint with invalid token', ({ given, when, then, and }) => {
    given('I am an unauthorized user', () => {
      mockProductRepository.findAll.mockResolvedValue(ProductsMock);
    });

    when('I request the "GET /products" endpoint with an invalid token', async () => {
      response = await request(app.getHttpServer())
        .get('/products')
        .set(
          'Authorization',
          'Bearer invalid_token_example',
        );
    });

    then('the response status code should be 401', () => {
      expect(response.status).toBe(401);
    });

    and('the response should contain "Unauthorized"', () => {
      expect(response.body.message).toBe('Unauthorized');
    });
  });
});
