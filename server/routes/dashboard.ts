import express from 'express'
import SaleModel from '../models/sale'

const router = express.Router()

router.get('/formasDePagamento', async (req, res) => {
  try {
    const sales = await SaleModel.find()
    const paymentTypes = sales?.reduce((acc: any, sale: any) => {
      const paymentAlreadyExists = !!acc.find(
        (s: any) => s.type === sale.paymentType,
      )
      if (!paymentAlreadyExists) {
        acc.push({
          type: sale.paymentType,
          value: sale.totalValue,
        })
      } else {
        acc.forEach((s: any) => {
          if (s.type === sale.paymentType) {
            s.value += sale.totalValue
          }
        })
      }

      return acc
    }, [])

    res.status(200).json({
      items: paymentTypes,
      message: 'Busca concluída com sucesso',
    })
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: 'Falha ao buscar dados', items: [] })
  }
})

export default router
