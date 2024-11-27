import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from '@datasource/typeorm/typeormconfig.module';

const feature = loadFeature('./tests/features/product.feature');

const initializeTestApp = async (): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [TestModule],
  }).compile();

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
  });

  afterAll(async () => {
    await app.close();
  });

  test('Admin accesses products endpoint', ({ given, when, then, and }) => {
    given('I am an authorized admin', () => {
      // Precondições podem ser configuradas aqui se necessário.
    });

    when('I request the "GET /products" endpoint', async () => {
      responseWithToken = await request(app.getHttpServer()).get('/products');
    });

    then('the response status code should be 200', () => {
      expect(responseWithToken.status).toBe(200);
    });

    and('the response should contain a list of products', () => {
      expect(responseWithToken.body).toEqual(expect.any(Array));
    });
  });

  test('Accessing products endpoint without token', ({ given, when, then, and }) => {
    given('I do not provide a token', () => {
      // Precondições podem ser configuradas aqui se necessário.
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
