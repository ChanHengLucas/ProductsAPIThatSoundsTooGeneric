import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, MongooseModule.forRoot(
    "mongodb+srv://lucaschan:308432308432@defaultboringclustermom.gvucs.mongodb.net/"
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
