import { ProductModel } from '../models/product'
import { IProductsRepository, Product } from './IProductsRepository'

export class ProductsRepository implements IProductsRepository {
  async list(): Promise<Product[]> {
    return await ProductModel.find()
  }

  async create(ProductData: Product): Promise<Product> {
    const newProduct = new ProductModel(ProductData)
    await newProduct.save()

    return newProduct
  }

  async update({ _id, name, value, stock }: any) {
    return await ProductModel.updateOne(
      { _id },
      { $set: { name, value, stock } },
    )
  }

  async delete(idProduct: string) {
    await ProductModel.deleteOne({ _id: idProduct })
  }
}
