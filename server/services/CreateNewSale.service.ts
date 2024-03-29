import { ISalesRepository, Sale } from "../repositories/Sales/ISalesRepository";

export class CreateNewSaleService {
  constructor(private salesRepository: ISalesRepository){}

  async execute({client, products, paymentType, totalValue}: Sale):Promise<Sale>{

    if (!paymentType) throw new Error('Forma de pagamento não informada')
    if (!products || products?.length === 0) throw new Error('Nenhum produto selecionado')
    
    const newSale = this.salesRepository.create({
      client,
      products,
      paymentType,
      totalValue,
    })

    return newSale
  }
}