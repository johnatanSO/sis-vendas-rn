export interface Product {
  name: string
  value: number
  stock: number
}

export interface IProductsRepository {
  list: () => Promise<Product[]>
  create: (ProductData: Product) => Promise<Product>
  update: (ProductData: Product) => any
  delete: (idProduct: string) => void
}
