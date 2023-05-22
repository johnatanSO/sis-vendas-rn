import express, { Request, Response } from 'express'
import SaleModel from '../models/sale'
import { ProductModel } from '../models/product'

const vendasRoutes = express.Router()

vendasRoutes.get('/', async (req, res) => {
  try {
    const sales = await SaleModel.find()

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
    if (!paymentType) {
      throw new Error('Forma de pagamento não informada')
    }
    if (!products || products?.length === 0) {
      throw new Error('Nenhum produto selecionado')
    }

    const newSale = new SaleModel({
      client,
      products,
      paymentType,
      totalValue,
    })

    for (const product of products) {
      await ProductModel.updateOne(
        { _id: product._id },
        { $inc: { stock: -Number(/* product.amount */ 1) } },
      )
    }

    await newSale.save()
    res.status(201).json({
      item: newSale,
      message: 'Venda cadastrada com sucesso!',
    })
  } catch (error) {
    res.status(500).json({ error })
  }
})

export { vendasRoutes }
