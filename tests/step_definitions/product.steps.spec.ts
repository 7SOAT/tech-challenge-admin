import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from '@datasource/typeorm/typeormconfig.module';
import ProductRepository from '../../src/externals/datasource/typeorm/repositories/product.repository'
import ProductsMock from '../../src/externals/datasource/typeorm/seed/seed-tables/product.seed';

const feature = loadFeature('./tests/features/product.feature');
jest.setTimeout(30000);


const mockProductRepository = {
  findAll: jest.fn().mockResolvedValue(ProductsMock),
  findOneById: jest.fn().mockImplementation((id) =>
    Promise.resolve(ProductsMock.find((product) => product.id === id)),
  ),
  findByCategory: jest.fn().mockImplementation((category) =>
    Promise.resolve(ProductsMock.filter((product) => product.category === category)),
  ),
  insert: jest.fn().mockImplementation((product) => {
    ProductsMock.push(product);
    return Promise.resolve(product);
  }),
  update: jest.fn().mockResolvedValue(1),
  delete: jest.fn().mockImplementation((id) => {
    const index = ProductsMock.findIndex((product) => product.id === id);
    if (index !== -1) {
      ProductsMock.splice(index, 1);
      return Promise.resolve(1);
    }
    return Promise.resolve(0);
  }),
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
      responseWithToken = await request(app.getHttpServer()).get('/products');
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
