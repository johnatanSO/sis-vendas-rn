const express = require('express')
const router = express.Router()
const SaleModel = require('../models/sale')

router.get('/formasDePagamento', async (req, res) => {
  try {
    const sales = await SaleModel.find()
    const paymentTypes = sales?.reduce((acc, sale) => {
      const paymentAlreadyExists = !!acc.find(
        (s) => s.type === sale.paymentType,
      )
      if (!paymentAlreadyExists) {
        acc.push({
          type: sale.paymentType,
          value: sale.totalValue,
        })
      } else {
        acc.forEach((s) => {
          if (s.type === sale.paymentType) {
            s.value += sale.totalValue
          }
        })
      }

      return acc
    }, [])

    res.status(200).json({
      items: paymentTypes,
      message: 'Busca concluída com sucesso!',
    })
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: 'Falha ao buscar dados', items: [] })
  }
})

module.exports = router
