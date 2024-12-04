import ProductEntity from "../../src/core/entities/product.entity";
import ProductCategory from "../../src/core/enums/product-category.enum";
import { randomUUID } from "crypto";
import ProductController from "../../src/adapters/controllers/product.controller";
import ProductUseCase from "../../src/core/usecases/product.usecase";
import { BadRequestException } from "@nestjs/common";
import ProductRepository from "../../src/externals/datasource/typeorm/repositories/product.repository";

describe("ProductController", () => {
  let productController: ProductController;
  let mockProductUseCase: jest.Mocked<ProductUseCase>;
  let mockProductRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    mockProductUseCase = {
      _productGateway: {
        update: jest.fn(),
        findByCategory: jest.fn(),
        findOneById: jest.fn(),
        findAll: jest.fn(),
        delete: jest.fn(),
        insert: jest.fn(),
      },
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
      findAllProducts: jest.fn(),
      findOneProductById: jest.fn(),
      findProductsByCategory: jest.fn(),
      deleteProduct: jest.fn(),
    } as unknown as jest.Mocked<ProductUseCase>;

    productController = new ProductController(mockProductUseCase);
  });

  it("should create a product", async () => {
    const productDto = {
      name: "New Product",
      description: "Description",
      price: 15.0,
      category: ProductCategory.Side,
    };
    const createdProduct: ProductEntity = { id: randomUUID(), ...productDto };

    mockProductUseCase.createProduct.mockResolvedValue(createdProduct);

    const result = await productController.createProduct(productDto);

    expect(mockProductUseCase.createProduct).toHaveBeenCalledWith(expect.any(ProductEntity));
    expect(result).toEqual(createdProduct);
  });

  it("should update a product", async () => {
    const product: ProductEntity = {
      id: randomUUID(),
      name: "Test Product",
      category: ProductCategory.Side,
      description: "Updated Description",
      price: 12.5,
    };

    mockProductUseCase.updateProduct.mockResolvedValue(product);

    const result = await productController.updateProduct(product.id, product);

    expect(mockProductUseCase.updateProduct).toHaveBeenCalledWith(product);
    expect(result).toEqual(product);
  });

  it("should find all products", async () => {
    const products: ProductEntity[] = [
      { id: randomUUID(), name: "Product 1", category: ProductCategory.Burger, description: "A", price: 10.5 },
      { id: randomUUID(), name: "Product 2", category: ProductCategory.Side, description: "B", price: 15.5 },
    ];
    mockProductUseCase.findAllProducts.mockResolvedValue(products);

    const result = await productController.findAllProducts();

    expect(mockProductUseCase.findAllProducts).toHaveBeenCalled();
    expect(result).toEqual(products);
  });

  it("should find a product by ID", async () => {
    const product: ProductEntity = {
      id: randomUUID(),
      name: "Test Product",
      category: ProductCategory.Side,
      description: "Description",
      price: 8.5,
    };

    mockProductUseCase.findOneProductById.mockResolvedValue(product);

    const result = await productController.findOneProductById(product.id);

    expect(mockProductUseCase.findOneProductById).toHaveBeenCalledWith(product.id);
    expect(result).toEqual(product);
  });

  it("should return a BadRequestException if product is not found by ID", async () => {
    const id = randomUUID();

    mockProductUseCase.findOneProductById.mockImplementation(() => {
      throw new BadRequestException("Product not found");
    });

    await expect(productController.findOneProductById(id)).rejects.toThrow(
      BadRequestException
    );
  });

  it("should find products by category", async () => {
    const products: ProductEntity[] = [
      { id: randomUUID(), name: "Product 1", category: ProductCategory.Burger, description: "A", price: 10.5 },
    ];
    mockProductUseCase.findProductsByCategory.mockResolvedValue(products);

    const result = await productController.findProductsByCategory(ProductCategory.Burger);

    expect(mockProductUseCase.findProductsByCategory).toHaveBeenCalledWith(ProductCategory.Burger);
    expect(result).toEqual(products);
  });

  it("should delete a product", async () => {
    const id = randomUUID();

    mockProductUseCase.deleteProduct.mockResolvedValue();

    await productController.deleteProduct(id);

    expect(mockProductUseCase.deleteProduct).toHaveBeenCalledWith(id);
  });
});
