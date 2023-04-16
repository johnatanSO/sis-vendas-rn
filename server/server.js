const express = require('express')
const app = express()
const PORT = 8080
const cors = require('cors')
app.use(cors())

app.listen(PORT, () => console.log('SERVIDOR RODANDO NA PORTA 8080!'))

app.get('/vendas', function (req, res) {
  try {
    const vendas = [
      {
        id: 1,
        paymentType: 'Cartão de crédito',
        value: 500,
      },
      {
        id: 2,
        paymentType: 'Cartão de débito',
        value: 900,
      },
      {
        id: 3,
        paymentType: 'Dinheiro',
        value: 250,
      },
      {
        id: 4,
        paymentType: 'PIX',
        value: 300,
      },
    ]

    res.status(200).json({
      items: vendas,
      message: 'Busca concluída com sucesso!',
    })
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: 'Falha ao buscar dados', items: [] })
  }
})
