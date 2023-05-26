import { ProductsRepository } from './../repositories/Products/ProductsRepository';
import express, { Request, Response } from 'express'
import { ProductModel } from '../models/product'
import { SalesRepository } from '../repositories/Sales/SalesRepository'
import { CreateNewSaleService } from '../services/CreateNewSale.service'
import { UpdateProductsStock } from '../services/UpdateProductsStock.service'

const vendasRoutes = express.Router()
const salesRepository = new SalesRepository()
const productsRepository = new ProductsRepository()

vendasRoutes.get('/', async (req, res) => {
  try {
    const sales = await salesRepository.list()
    res.status(200).json({
      items: sales,
      message: 'Busca concluída com sucesso!',
    })
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: 'Falha ao buscar dados', items: [] })
  }
})

vendasRoutes.post('/', async (req: Request, res: Response) => {
  const { client, products, paymentType, totalValue = 0 } = req.body

  try {
    const createNewSaleService = new CreateNewSaleService(salesRepository)
    const newSale = await createNewSaleService.execute({client, products, paymentType, totalValue})

    const updateProductsStock = new UpdateProductsStock(productsRepository)
    await updateProductsStock.execute(products)

    res.status(201).json({
      item: newSale,
      message: 'Venda cadastrada com sucesso!',
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export { vendasRoutes }
