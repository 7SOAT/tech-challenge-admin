import ProductUseCase from "../../src/core/usecases/product.usecase";
import IProductGateway from "../../src/package/interfaces/datasource/product.gateway";
import ProductEntity from "../../src/core/entities/product.entity";
import ProductCategory from "../../src/core/enums/product-category.enum";
import {randomUUID} from "crypto";

describe("ProductUseCase", () => {
  let productUseCase: ProductUseCase;
  let mockProductGateway: jest.Mocked<IProductGateway>;

  beforeEach(() => {
    mockProductGateway = {
      update: jest.fn(),
      findByCategory: jest.fn(),
      findOneById: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
      insert: jest.fn(),
    };

    productUseCase = new ProductUseCase(mockProductGateway);
  });

  it("should update a product", async () => {
    const product: ProductEntity = { id: randomUUID(), name: "Test Product", category: ProductCategory.Side, description: "C", price: 11.5 };
    mockProductGateway.update.mockResolvedValue();

    const updatedProduct = await productUseCase.updateProduct(product);

    expect(mockProductGateway.update).toHaveBeenCalledWith(product.id, product);
    expect(updatedProduct).toEqual(product);
  });

  it("should find products by category", async () => {
    const products: ProductEntity[] = [
      { id: randomUUID(), name: "Product 1", category: ProductCategory.Burger, description: "A", price: 10.5 },
      { id: randomUUID(), name: "Product 2", category: ProductCategory.Side, description: "A", price: 10.5 },
    ];
    mockProductGateway.findByCategory.mockResolvedValue(products);

    const result = await productUseCase.findProductsByCategory(ProductCategory.Burger);

    expect(mockProductGateway.findByCategory).toHaveBeenCalledWith(ProductCategory.Burger);
    expect(result).toEqual(products);
  });

  it("should find a product by ID", async () => {
    const product: ProductEntity = { id: randomUUID(), name: "Test Product", category: ProductCategory.Beverage, description: "A", price: 10.5 };
    mockProductGateway.findOneById.mockResolvedValue(product);

    const result = await productUseCase.findOneProductById(product.id);

    expect(mockProductGateway.findOneById).toHaveBeenCalledWith(product.id);
    expect(result).toEqual(product);
  });

  it("should throw an error when product is not found by ID", async () => {
    const productId = randomUUID()
    mockProductGateway.findOneById.mockRejectedValue(new Error("Product not found"));

    await expect(productUseCase.findOneProductById(productId)).rejects.toThrow("Product not found");
    expect(mockProductGateway.findOneById).toHaveBeenCalledWith(productId);
  });

  it("should find all products", async () => {
    const products: ProductEntity[] = [
      { id: randomUUID(), name: "Product 1", category: ProductCategory.Beverage, description: "A", price:11.4 },
      { id: randomUUID(), name: "Product 2", category: ProductCategory.Burger, description: "A", price:11.4 },
    ];
    mockProductGateway.findAll.mockResolvedValue(products);

    const result = await productUseCase.findAllProducts();

    expect(mockProductGateway.findAll).toHaveBeenCalled();
    expect(result).toEqual(products);
  });

  it("should delete a product by ID", async () => {
    const productId = randomUUID();
    mockProductGateway.delete.mockResolvedValue();

    await productUseCase.deleteProduct(productId);

    expect(mockProductGateway.delete).toHaveBeenCalledWith(productId);
  });

  it("should create a new product", async () => {
    const product: ProductEntity = { id: randomUUID(), name: "New Product", category: ProductCategory.Dessert, description: "A", price: 10.5 };
    mockProductGateway.insert.mockResolvedValue(product);

    const createdProduct = await productUseCase.createProduct(product);

    expect(mockProductGateway.insert).toHaveBeenCalledWith(product);
    expect(createdProduct).toEqual(product);
  });

  it("should throw an error when product creation fails", async () => {
    const product: ProductEntity = { id: randomUUID(), name: "New Product", category: ProductCategory.Dessert, description: "A", price: 10.5 };
    mockProductGateway.insert.mockRejectedValue(new Error("Insertion failed"));

    await expect(productUseCase.createProduct(product)).rejects.toThrow("Insertion failed");
    expect(mockProductGateway.insert).toHaveBeenCalledWith(product);
  });
});
