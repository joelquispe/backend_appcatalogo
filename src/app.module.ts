import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/product/product.module';
import { ProductController } from './modules/product/controllers/product.controller';
import { ProductService } from './modules/product/services/product.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/appcatalogo', {
      useNewUrlParser: true,
      dbName: 'appcatalogo',
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
