import { AtLeastOneField } from "@api/validators/at-least-one-field.validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import ProductCategory from "core/enums/product-category.enum";

@AtLeastOneField()
export default class UpdateProductDto {
  @ApiProperty({ required: false })
  @IsOptional()
  category?: ProductCategory;

  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  isActive?: boolean;
}
