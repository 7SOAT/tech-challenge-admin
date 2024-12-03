import ProductEntity from "../../src/core/entities/product.entity";
import ProductCategory from "../../src/core/enums/product-category.enum";
import { randomUUID } from "crypto";
import ProductController from "../../src/adapters/controllers/product.controller";
import ProductRepository from "@repositories/product.repository";

describe("ProductController", () => {
  let productController: ProductController;
  let mockProductUseCase: {
    findProductsByCategory: jest.Mock;
    updateProduct: jest.Mock;
    createProduct: jest.Mock;
    findOneProductById: jest.Mock;
    findAllProducts: jest.Mock;
    deleteProduct: jest.Mock
  };
  let mockProductRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    mockProductUseCase = {
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
      findAllProducts: jest.fn(),
      findOneProductById: jest.fn(),
      findProductsByCategory: jest.fn(),
      deleteProduct: jest.fn(),
    };

    productController = new ProductController(mockProductRepository);
  });

  it("should update a product", async () => {
    const product: ProductEntity = {
      id: randomUUID(),
      name: "Test Product",
      category: ProductCategory.Side,
      description: "C",
      price: 11.5,
    };

    mockProductUseCase.updateProduct.mockResolvedValue(product);

    const updatedProduct = await productController.updateProduct(product.id, product);

    expect(mockProductUseCase.updateProduct).toHaveBeenCalledWith(product);
    expect(updatedProduct).toEqual(product);
  });

  it("should find products by category", async () => {
    const products: ProductEntity[] = [
      { id: randomUUID(), name: "Product 1", category: ProductCategory.Burger, description: "A", price: 10.5 },
      { id: randomUUID(), name: "Product 2", category: ProductCategory.Side, description: "A", price: 10.5 },
    ];
    mockProductUseCase.findProductsByCategory.mockResolvedValue(products);

    const result = await productController.findProductsByCategory(ProductCategory.Burger);

    expect(mockProductUseCase.findProductsByCategory).toHaveBeenCalledWith(ProductCategory.Burger);
    expect(result).toEqual(products);
  });

  it("should find a product by ID", async () => {
    const product: ProductEntity = {
      id: randomUUID(),
      name: "Test Product",
      category: ProductCategory.Beverage,
      description: "A",
      price: 10.5,
    };
    mockProductUseCase.findOneProductById.mockResolvedValue(product);

    const result = await productController.findOneProductById(product.id);

    expect(mockProductUseCase.findOneProductById).toHaveBeenCalledWith(product.id);
    expect(result).toEqual(product);
  });

  it("should throw an error when product is not found by ID", async () => {
    const productId = randomUUID();
    mockProductUseCase.findOneProductById.mockRejectedValue(new Error("Product not found"));

    await expect(productController.findOneProductById(productId)).rejects.toThrow("Product not found");
    expect(mockProductUseCase.findOneProductById).toHaveBeenCalledWith(productId);
  });

  it("should find all products", async () => {
    const products: ProductEntity[] = [
      { id: randomUUID(), name: "Product 1", category: ProductCategory.Beverage, description: "A", price: 11.4 },
      { id: randomUUID(), name: "Product 2", category: ProductCategory.Burger, description: "A", price: 11.4 },
    ];
    mockProductUseCase.findAllProducts.mockResolvedValue(products);

    const result = await productController.findAllProducts();

    expect(mockProductUseCase.findAllProducts).toHaveBeenCalled();
    expect(result).toEqual(products);
  });

  it("should delete a product by ID", async () => {
    const productId = randomUUID();
    mockProductUseCase.deleteProduct.mockResolvedValue(productId);

    await productController.deleteProduct(productId);

    expect(mockProductUseCase.deleteProduct).toHaveBeenCalledWith(productId);
  });

  it("should create a new product", async () => {
    const product: ProductEntity = {
      id: randomUUID(),
      name: "New Product",
      category: ProductCategory.Dessert,
      description: "A",
      price: 10.5,
    };
    mockProductUseCase.createProduct.mockResolvedValue(product);

    const createdProduct = await productController.createProduct(product);

    expect(mockProductUseCase.createProduct).toHaveBeenCalledWith(product);
    expect(createdProduct).toEqual(product);
  });

  it("should throw an error when product creation fails", async () => {
    const product: ProductEntity = {
      id: randomUUID(),
      name: "New Product",
      category: ProductCategory.Dessert,
      description: "A",
      price: 10.5,
    };
    mockProductUseCase.createProduct.mockRejectedValue(new Error("Insertion failed"));

    await expect(productController.createProduct(product)).rejects.toThrow("Insertion failed");
    expect(mockProductUseCase.createProduct).toHaveBeenCalledWith(product);
  });
});
