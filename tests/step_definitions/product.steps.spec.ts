import { defineFeature, loadFeature } from 'jest-cucumber';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import ProductController from '../../src/adapters/controllers/product.controller';
import { JwtService } from '@nestjs/jwt';
import { AdminGuard } from '@api/validators/admin-guard';

const feature = loadFeature('tests/features/product.feature');

defineFeature(feature, (test) => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: JwtService,
          useValue: {
            verify: jest.fn().mockImplementation((token) => {
              if (token === 'valid-admin-token') return { isAdmin: true };
              throw new Error('Invalid token');
            }),
          },
        },
      ],
    })
      .overrideGuard(AdminGuard)
      .useValue({
        canActivate: (context) => {
          const request = context.switchToHttp().getRequest();
          request.user = { isAdmin: true };
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test('Accessing the products endpoint as an admin', ({ given, when, then }) => {
    let response: request.Response;

    given('I am an authorized admin', () => {
    });

    when('I request the "GET /products" endpoint', async () => {
      response = await request(app.getHttpServer())
        .get('/products')
        .set('Authorization', 'Bearer valid-admin-token');
    });

    then('the response status code should be 200', () => {
      expect(response.status).toBe(200);
    });

    then('the response should contain "This action returns all products"', () => {
      expect(response.text).toBe('This action returns all products');
    });
  });

  test('Accessing the products endpoint without a token', ({ given, when, then }) => {
    let response: request.Response;

    given('I do not provide a token', () => {
    });

    when('I request the "GET /products" endpoint', async () => {
      response = await request(app.getHttpServer()).get('/products');
    });

    then('the response status code should be 401', () => {
      expect(response.status).toBe(401);
    });

    then('the response should contain "Authorization header not found"', () => {
      expect(response.body.message).toBe('Authorization header not found');
    });
  });
});
