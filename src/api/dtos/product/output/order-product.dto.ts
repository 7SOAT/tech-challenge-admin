import ProductCategory from "../../../../core/enums/product-category.enum";
import { UUID } from "crypto";

export default class OrderProductDto {
    constructor(
        public id: UUID,
        public name: string,
        public price: number,
        public description: string,
        public category: ProductCategory
    ){}
}
