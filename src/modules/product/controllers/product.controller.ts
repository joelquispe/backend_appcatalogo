import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { IFilteredProduct } from '../interfaces/filtered.product.interface';
import { ProductService } from '../services/product.service';
import { FilterProductDto } from '../dto/filtered.product.dto';
import { CreateProductDto } from '../dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  getAll() {
    return this.productService.getAll();
  }

  @Get('filter')
  async getFilteredProducts(@Query() filteredProduct: IFilteredProduct) {
    return this.productService.getFilteredProducts(filteredProduct);
  }

  @Post('create')
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
