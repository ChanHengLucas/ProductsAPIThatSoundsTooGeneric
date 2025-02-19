import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>
    ) {}

    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({
            title, 
            desc, 
            price,
        });
        const result = await newProduct.save(); // waits for data to save to database
        console.log(result);
        return result.id as string;
    }

    async getProducts() {
        const products = await this.productModel.find().exec(); // returns real promise
        return products.map((prod) => ({
            id: prod.id, 
            title: prod.title, 
            desc: prod.desc, 
            price: prod.price
        })); // yields a list of products
    }

    getSingleProduct(productId: string) {
        const product = this.findProduct(productId)[0];
        return { ...product };
    }

    updateProduct(productId: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(productId);
        const updatedProduct = { ...product };
        if (title){
            updatedProduct.title = title;
        }
        if (desc){
            updatedProduct.desc = desc;
        }
        if (price){
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
        

    }

    deleteProduct(prodId: string) {
        const index = this.findProduct(prodId)[1];
        this.products.splice(index, 1);
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id == id);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not find product.');
        }
        return [product, productIndex];
    }

    
}