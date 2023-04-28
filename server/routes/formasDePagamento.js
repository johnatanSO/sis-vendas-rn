const express = require('express')
const router = express.Router()
const sales = require('../db/sales.data')
const formasDePagamento = require('../db/formasDePagamento.data')

router.get('/', function (req, res) {
  try {
    const totalPaymentTypes = sales.reduce(
      (acc, sale) => {
        if (sale.paymentType === 'credit_card') acc.credit_card += sale.value
        if (sale.paymentType === 'debit_card') acc.debit_card += sale.value
        if (sale.paymentType === 'money') acc.money += sale.value
        if (sale.paymentType === 'pix') acc.pix += sale.value

        return acc
      },
      {
        credit_card: 0,
        debit_card: 0,
        money: 0,
        pix: 0,
      },
    )

    formasDePagamento.forEach((formaDePagamento) => {
      if (formaDePagamento.paymentType === 'Cartão de crédito')
        formaDePagamento.value = totalPaymentTypes.cartaoDeCredito
      if (formaDePagamento.paymentType === 'Cartão de débito')
        formaDePagamento.value = totalPaymentTypes.cartaoDeDebito
      if (formaDePagamento.paymentType === 'Dinheiro')
        formaDePagamento.value = totalPaymentTypes.dinheiro
      if (formaDePagamento.paymentType === 'PIX')
        formaDePagamento.value = totalPaymentTypes.pix
    })

    res.status(200).json({
      items: formasDePagamento,
      message: 'Busca concluída com sucesso!',
    })
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: 'Falha ao buscar dados', items: [] })
  }
})

module.exports = router
