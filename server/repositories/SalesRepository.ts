import { SaleModel } from '../models/sale'
import { ISalesRepository, Sale } from './ISalesRepository'

export class SalesRepository implements ISalesRepository {
  async list(): Promise<Sale[]> {
    return await SaleModel.find()
  }
}
