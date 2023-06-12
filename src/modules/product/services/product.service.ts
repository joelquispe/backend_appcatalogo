import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductSchema } from '../schemas/product.schema';
import { Model } from 'mongoose';
import { IFilteredProduct } from '../interfaces/filtered.product.interface';
import { IProduct } from '../interfaces/product.interface';
import { CreateProductDto } from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductSchema.get.name)
    private readonly productRepository: Model<typeof ProductSchema>,
  ) {}

  async getAll(): Promise<IProduct[]> {
    return await this.productRepository.find();
  }

  async getFilteredProducts(filteredProduct: IFilteredProduct) {
    console.log(filteredProduct);
    let filteredProducts = await this.getAll();
    if (filteredProduct.brand) {
      filteredProducts = filteredProducts.filter(
        (value) => value.brand == filteredProduct.brand,
      );
    }
    if (filteredProduct.category) {
      filteredProducts = filteredProducts.filter(
        (value) => value.category == filteredProduct.category,
      );
    }
    if (filteredProduct.price) {
      filteredProducts = filteredProducts.filter(
        (value) => value.price < filteredProduct.price,
      );
    }

    return filteredProducts;
  }

  async create(product: CreateProductDto) {
    const productModel = await this.productRepository.create(product);
    productModel.save();

    return productModel;
  }

  async delete(id: string) {
    return await this.productRepository.findByIdAndDelete(id);
  }
}
