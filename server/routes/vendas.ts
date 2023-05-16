import express from 'express'
import SaleModel from '../models/sale'
import ProductModel from '../models/product'

const router = express.Router()

router.get('/', async (req, res) => {
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

router.post('/', async (req, res) => {
  try {
    if (!req.body.paymentType) {
      res.status(500).json({
        error: 'Forma de pagamento não informada',
        message: 'Por favor, informe uma forma de pagamento',
      })
    }
    if (!req.body.products || req.body.products?.length === 0) {
      res.status(500).json({
        error: 'Nenhum produto selecionado',
        message: 'Por favor, selecione algum produto',
      })
    }

    const newSale = new SaleModel({
      client: req.body.client,
      products: req.body.products,
      paymentType: req.body.paymentType,
      totalValue: req.body.totalValue,
    })

    for (const product of req.body.products) {
      await ProductModel.updateOne(
        { _id: product._id },
        { $inc: { stock: -Number(product.amount) } },
      )
    }

    await newSale.save()
    res.status(201).json({
      item: newSale,
      message: 'Venda cadastrada com sucesso!',
    })
  } catch (err) {
    res.status(500).json({
      error: err,
      message: 'Falha ao cadastrar venda',
      item: undefined,
    })
  }
})

export default router
