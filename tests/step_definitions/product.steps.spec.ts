import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import ProductRepository from "../../src/externals/datasource/typeorm/repositories/product.repository";
import ProductController from "../../src/adapters/controllers/product.controller";
import ProductModel from "../../src/package/models/product.model";

const feature = loadFeature('./tests/features/product.feature');

defineFeature(feature, (test) => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([ProductModel])],
      controllers: [ProductController],
      providers: [ProductRepository],
    }).compile();

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
    });

    then('the response status code should be 200', () => {
      expect(response.status).toBe(200);
    });

    then('the response should contain a list of products', () => {
      expect(response.body).toEqual(expect.any(Array));
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
