import ProductCategory from "core/enums/product-category.enum";
import ProductEntity from "core/entities/product.entity";
import ProductModel from "@models/product.model";

const ProductMockList: ProductEntity[] = [
    new ProductEntity("x-salada", "Pão crocante, alface, tomate, queijo e maionese da casa.", 25.5, ProductCategory.Burger, '00000000-0000-0000-0000-000000000001'),
    new ProductEntity("Coca-Cola", "Lata de Coca-Cola (350ml)", 5, ProductCategory.Beverage, '00000000-0000-0000-0000-000000000002'),
    new ProductEntity("Batata Frita", "Porção de Batata Frita (300g)", 15, ProductCategory.Side, '00000000-0000-0000-0000-000000000003'),
    new ProductEntity("Petit Gateau", "Pequeno bolo de chocolate com casca e recheio cremoso acompanhado de sorvete", 45, ProductCategory.Dessert, '00000000-0000-0000-0000-000000000004')
]

const ProductsMock: ProductModel[] = ProductMockList.map(item => new ProductModel(item))

export default ProductsMock;