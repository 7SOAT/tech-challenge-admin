import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import ProductRoute from '../../src/api/routes/product/product.route';
import ProductRepository from '../../src/externals/datasource/typeorm/repositories/product.repository';
import {AdminGuard} from '../../src/api/validators/admin-guard';
import ProductsMock from '../../src/externals/datasource/typeorm/seed/seed-tables/product.seed';
import CreateProductDto from '../../src/api/dtos/product/create-product.dto';
import UpdateProductBodyDto from '../../src/api/dtos/product/update-product.dto';
import ProductCategory from "../../src/core/enums/product-category.enum";

const mockProductRepository = {
  findOneById: jest.fn(),
  findAll: jest.fn(),
  findByCategory: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('ProductRoute', () => {
  let app: INestApplication;

  beforeAll(async () => {
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

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('should return all products on GET /products', async () => {
    mockProductRepository.findAll.mockResolvedValue(ProductsMock);

    const response = await request(app.getHttpServer())
      .get('/products')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhNDE4MjQ1OC04MDQxLTcwMjEtZTIyNi0wYTJiMGYwN2E5ZDYiLCJjcGYiOiJ0ZWNoLWNoYWxsZW5nZS1vcmRlciIsImlzQWRtaW4iOnRydWUsImlhdCI6MTczMjg0MDE0NCwiZXhwIjoxNzMyODQzNzQ0fQ.h8AO2ut9tTPwHvnB97yLYGPmSQpZaj4i_iOBZUxmibM'
      );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(ProductsMock);
  });

  it('should return a product by ID on GET /products/:productId', async () => {
    const productId = 'valid_product_id';
    const product = ProductsMock[0];

    mockProductRepository.findOneById.mockResolvedValue(product);

    const response = await request(app.getHttpServer())
      .get(`/products/${productId}`)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhNDE4MjQ1OC04MDQxLTcwMjEtZTIyNi0wYTJiMGYwN2E5ZDYiLCJjcGYiOiJ0ZWNoLWNoYWxsZW5nZS1vcmRlciIsImlzQWRtaW4iOnRydWUsImlhdCI6MTczMjg0MDE0NCwiZXhwIjoxNzMyODQzNzQ0fQ.h8AO2ut9tTPwHvnB97yLYGPmSQpZaj4i_iOBZUxmibM'
      );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(product);
  });

  it('should return products by category on GET /products/by-category/:category', async () => {
    const category = ProductCategory.Burger
    const productsByCategory = ProductsMock.filter(product => product.category === category);

    mockProductRepository.findByCategory.mockResolvedValue(productsByCategory);

    const response = await request(app.getHttpServer())
      .get(`/products/by-category/${category}`)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhNDE4MjQ1OC04MDQxLTcwMjEtZTIyNi0wYTJiMGYwN2E5ZDYiLCJjcGYiOiJ0ZWNoLWNoYWxsZW5nZS1vcmRlciIsImlzQWRtaW4iOnRydWUsImlhdCI6MTczMjg0MDE0NCwiZXhwIjoxNzMyODQzNzQ0fQ.h8AO2ut9tTPwHvnB97yLYGPmSQpZaj4i_iOBZUxmibM'
      );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(productsByCategory);
  });

  it('should create a product on POST /products', async () => {
    const createProductDto: CreateProductDto = {
      name: 'New Product',
      description: 'Product Description',
      price: 100,
      category: ProductCategory.Burger,
    };

    mockProductRepository.insert.mockResolvedValue({ ...createProductDto, id: 'new_product_id' });

    const response = await request(app.getHttpServer())
      .post('/products')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhNDE4MjQ1OC04MDQxLTcwMjEtZTIyNi0wYTJiMGYwN2E5ZDYiLCJjcGYiOiJ0ZWNoLWNoYWxsZW5nZS1vcmRlciIsImlzQWRtaW4iOnRydWUsImlhdCI6MTczMjg0MDE0NCwiZXhwIjoxNzMyODQzNzQ0fQ.h8AO2ut9tTPwHvnB97yLYGPmSQpZaj4i_iOBZUxmibM'
      )
      .send(createProductDto);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(createProductDto.name);
    expect(response.body.id).toBeDefined();
  });

  it('should update a product on PUT /products/:id', async () => {
    const productId = 'existing_product_id';
    const updateProductDto: UpdateProductBodyDto = {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 150,
      category: ProductCategory.Burger,
    };

    mockProductRepository.update.mockResolvedValue({ ...updateProductDto, id: productId });

    const response = await request(app.getHttpServer())
      .put(`/products/${productId}`)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhNDE4MjQ1OC04MDQxLTcwMjEtZTIyNi0wYTJiMGYwN2E5ZDYiLCJjcGYiOiJ0ZWNoLWNoYWxsZW5nZS1vcmRlciIsImlzQWRtaW4iOnRydWUsImlhdCI6MTczMjg0MDE0NCwiZXhwIjoxNzMyODQzNzQ0fQ.h8AO2ut9tTPwHvnB97yLYGPmSQpZaj4i_iOBZUxmibM'
      )
      .send(updateProductDto);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updateProductDto.name);
  });

  it('should delete a product on DELETE /products/:productId', async () => {
    const productId = 'product_to_delete';

    mockProductRepository.delete.mockResolvedValue(null);

    const response = await request(app.getHttpServer())
      .delete(`/products/${productId}`)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhNDE4MjQ1OC04MDQxLTcwMjEtZTIyNi0wYTJiMGYwN2E5ZDYiLCJjcGYiOiJ0ZWNoLWNoYWxsZW5nZS1vcmRlciIsImlzQWRtaW4iOnRydWUsImlhdCI6MTczMjg0MDE0NCwiZXhwIjoxNzMyODQzNzQ0fQ.h8AO2ut9tTPwHvnB97yLYGPmSQpZaj4i_iOBZUxmibM'
      );

    expect(response.status).toBe(200);
  });

  it('should return 401 if no token is provided on GET /products', async () => {
    const response = await request(app.getHttpServer()).get('/products');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authorization header not found');
  });

  it('should return 401 if the token is invalid on GET /products', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .set('Authorization', 'Bearer invalid_token');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });
});
