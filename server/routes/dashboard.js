const express = require('express')
const router = express.Router()
const SaleModel = require('../models/sale')

router.get('/formasDePagamento', async (req, res) => {
  try {
    const sales = await SaleModel.find()
    console.log(sales)

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

module.exports = router
