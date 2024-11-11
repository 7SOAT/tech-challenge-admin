
import ProductDto from '@api/dtos/product/output/product.dto';
import ProductEntity from '@entities/product.entity';

class ProductPresenter {
  static PresentOne(product: ProductEntity): ProductDto {
    return new ProductDto(
      product.id,
      product.name,
      product.category,
      product.price,
      product.description
    );
  }

  static PresentMany(products: ProductEntity[]): ProductDto[] {
    return products.map((product) => this.PresentOne(product));
  }
}

export default ProductPresenter;
