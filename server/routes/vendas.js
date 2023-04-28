const express = require('express')
const router = express.Router()
const SaleModel = require('../models/sale')

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
    const newSale = new SaleModel({
      client: req.body.client,
      products: req.body.products,
      paymentType: req.body.paymentType,
      totalValue: req.body.totalValue,
    })
    await newSale.save()

    res.status(200).json({
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

module.exports = router